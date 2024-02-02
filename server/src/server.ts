import express from 'express'
import authRoutes from './routes/auth'
import subRoutes from './routes/subs'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('Connected to DB...')

    const app = express()

    app.use(express.json())
    app.use(cors())
    app.use('/auth', authRoutes)
    app.use('/subs', subRoutes)

    app.listen(8000, () => {
      console.log('Now listening on port 8000...')
    })
  })
  .catch((error) => {
    console.log(error)
    throw new Error(error)
  })
