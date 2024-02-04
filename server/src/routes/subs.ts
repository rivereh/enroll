import express from 'express'
import User from '../models/user'
import { checkAuth } from '../middleware/checkAuth'
import { stripe } from '../utils/stripe'

const router = express.Router()

router.get('/prices', checkAuth, async (req, res) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  })

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

router.post('/cancel', checkAuth, async (req, res) => {
  const subscription = await stripe.subscriptions.cancel(
    'sub_1Ofv5FJW5UHejh3eJ5XFJsy9',
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  )
  return res.json(subscription)
})

export default router
