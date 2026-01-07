import express from 'express'
import authRoutes from './routes/auth.js'
import subRoutes from './routes/subs.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const mongoUri = process.env.MONGO_URI

if (!mongoUri) {
  console.error('\nERROR: MONGO_URI is not set. Create a .env file with MONGO_URI=your_mongo_uri\n')
  process.exit(1)
}

mongoose
  .connect(mongoUri)
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
