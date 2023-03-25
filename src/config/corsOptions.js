import { allowedOriginsArray } from './allowedOrigins.js'

export const corsOptions = {
  origin: (origin, callback) => {
    allowedOriginsArray.includes(origin) || !origin
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  optionsSuccessStatus: 200
}
