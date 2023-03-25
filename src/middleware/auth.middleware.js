import rateLimit from 'express-rate-limit'
import createHttpError from 'http-errors'

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per 1 minute)
  message: 'Too many accounts created from this IP, please try again after a minute',
  handler: (request, response, next, options) => {
    next(createHttpError(options.statusCode, options.message))
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
})
