import createHttpError, { isHttpError } from 'http-errors'

export const errorHandler = (error, req, res, next) => {
  let errorMessage = 'An unknown error occurred'
  let statusCode = 500

  if (isHttpError(error)) {
    statusCode = error.status
    errorMessage = error.message
  }
  res.status(statusCode).json({ error: errorMessage })
}

export const notFoundEndPoint = (req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'))
}
