import rateLimit from 'express-rate-limit'
import createHttpError from 'http-errors'

export const rateLimiter = (time = 1) =>
  rateLimit({
    windowMs: time * 60 * 1000, // 1 minutes
    max: 5, // Limit each IP to 5 requests per `window` (here, per 1 minute)
    message: `Bạn đã thực hiện tác vụ này quá nhiều lần. Vui lòng thử lại sau ${time} phút`,
    handler: (request, response, next, options) => {
      next(createHttpError(options.statusCode, options.message))
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
  })
