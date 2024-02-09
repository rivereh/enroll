import express from 'express'
import { body, check, validationResult } from 'express-validator'
import User from '../models/user'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import { checkAuth } from '../middleware/checkAuth'
import { stripe } from '../utils/stripe'
import { subscribe } from 'diagnostics_channel'

const router = express.Router()

router.post(
  '/signup',
  body('firstName')
    .isLength({ min: 3 })
    .withMessage('Name must be of 3 characters long.')
    .isAlpha()
    .withMessage('First name contains invalid characters'),
  body('lastName')
    .isLength({ min: 3 })
    .withMessage('Name must be of 3 characters long.')
    .isAlpha()
    .withMessage('Last name contains invalid characters'),
  body('email').isEmail().withMessage('Email is inavlid'),
  body('password').isLength({ min: 5 }).withMessage('Password is too short'),
  async (req, res) => {
    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((error) => {
        return {
          msg: error.msg,
        }
      })

      return res.json({ errors, data: null })
    }

    const { firstName, lastName, email, password } = req.body

    const user = await User.findOne({ email })

    if (user) {
      return res.json({
        errors: [
          {
            msg: 'Email already in use',
          },
        ],
        data: null,
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const customer = await stripe.customers.create(
      {
        name: firstName + ' ' + lastName,
        email,
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    )

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      customerStripeId: customer.id,
    })

    const token = await JWT.sign(
      {
        email: newUser.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 360000,
      }
    )

    res.json({
      errors: [],
      data: {
        token,
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          customerStripeId: customer.id,
        },
      },
    })
  }
)

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.json({
      errors: [
        {
          msg: 'Invalid credentials',
        },
      ],
      data: null,
    })
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.json({
      errors: [
        {
          msg: 'Invalid credentials',
        },
      ],
      data: null,
    })
  }

  const token = await JWT.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: 360000,
    }
  )

  res.json({
    errors: [],
    data: {
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
      },
    },
  })
})

router.get('/sub', checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user })

  const subscription = await stripe.subscriptions.list(
    {
      customer: user?.customerStripeId,
      expand: ['data.default_payment_method'],
    },
    { apiKey: process.env.STRIPE_SECRET_KEY }
  )

  const subscribed = subscription.data.length > 0
  return res.json(subscribed)
})

router.get('/me', checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user })

  const subscription = await stripe.subscriptions.list(
    {
      customer: user?.customerStripeId,
      status: 'all',
      expand: ['data.default_payment_method'],
    },
    { apiKey: process.env.STRIPE_SECRET_KEY }
  )

  const subscribed = subscription.data.length > 0

  return res.json({
    errors: [],
    data: {
      user: {
        id: user?._id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        customerStripeId: user?.customerStripeId,
        subscribed: subscribed,
      },
    },
  })
})

export default router
