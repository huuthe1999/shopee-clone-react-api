import { allowedOriginsArray } from './allowedOrigins.js'

export const corsOptions = {
  origin: (origin, callback) => {
    allowedOriginsArray.includes(origin) || !origin
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'))
  },
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400, // 1 day
  credentials: true,
  optionsSuccessStatus: 200
}
