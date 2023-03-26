import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import morgan from 'morgan'

import connectDB from './config/connectDB.js'
import { corsOptions } from './config/corsOptions.js'
import { errorHandler, notFoundEndPoint } from './middleware/error-handler.middleware.js'
import authRoute from './routes/auth.route.js'

connectDB()
const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.set('trust proxy', 1)
app.use('/auth', authRoute)

// Not found endpoint & handle error middleware
app.use(notFoundEndPoint)
app.use(errorHandler)

mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})
