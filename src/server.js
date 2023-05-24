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
app.use(express.json())
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

export default app
// randomProduct('Thoi-Trang-Nu', '6460d996eed977fdad32a906')
// deleteAllProduct()
// deleteAllProductBySubCate('6460d996eed977fdad32a906')
