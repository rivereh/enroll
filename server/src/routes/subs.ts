import express from 'express'
import User from '../models/user'
import { checkAuth } from '../middleware/checkAuth'
import { stripe } from '../utils/stripe'

const router = express.Router()

router.get('/prices', checkAuth, async (req, res) => {
  const prices = await stripe.prices.list(
    // { type: 'recurring' },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  )

  return res.json(prices)
})

router.post('/session', checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user })
  const session = await stripe.checkout.sessions.create(
    {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:5173/dash',
      cancel_url: 'http://localhost:5173/prices',
      customer: user?.customerStripeId,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  )

  return res.json(session)
})

router.delete('/cancel', checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user })
  const subscription = await stripe.subscriptions.list(
    {
      customer: user?.customerStripeId,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  )

  const subscriptionId = subscription.data[0].id
  const cancelled = await stripe.subscriptions.cancel(subscriptionId, {
    apiKey: process.env.STRIPE_SECRET_KEY,
  })
  return res.json(cancelled)
})

router.post('/resubscribe', checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user })
  const subscription = await stripe.subscriptions.list(
    {
      customer: user?.customerStripeId,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  )

  const subscriptionId = subscription.data[0].id
  const cancelled = await stripe.subscriptions.resume(
    subscriptionId,
    { billing_cycle_anchor: 'now' },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  )
  return res.json(cancelled)
})

export default router
