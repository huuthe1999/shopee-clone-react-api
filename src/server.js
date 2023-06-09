import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import morgan from 'morgan'

import connectDB from './config/connectDB.js'
import { corsOptions } from './config/corsOptions.js'
import { errorHandler, notFoundEndPoint } from './middleware/error-handler.middleware.js'
import adminRoute from './routes/admin/index.route.js'
import indexRoute from './routes/index.route.js'

connectDB()
const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())

app.set('trust proxy', 1)
// Welcome path
app.get('/', (req, res) =>
  res.json({ message: 'Connect to DB successfully', env: process.env.NODE_ENV })
)

app.use(indexRoute)
app.use('/admin', adminRoute)

// Not found endpoint & handle error middleware
app.use(notFoundEndPoint)
app.use(errorHandler)

mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})

// randomProduct(
//   'Cham-Soc-Thu-Cung',
//   '64a00a9dfbcdbdf5076532af',
//   '645f7a085376c706cc202af1',
//   100919,
//   11036478
// )
export default app
