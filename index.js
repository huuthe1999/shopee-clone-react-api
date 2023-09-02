import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'

import connectDB from './src/config/connectDB.js'
import { corsOptions } from './src/config/corsOptions.js'
import { errorHandler, notFoundEndPoint } from './src/middleware/error-handler.middleware.js'
import adminRoute from './src/routes/admin/index.route.js'
import indexRoute from './src/routes/index.route.js'

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

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})

// mongoose.connection.once('open', () => {
//   app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
// })

export default app
