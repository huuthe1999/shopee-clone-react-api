import createHttpError, { isHttpError } from 'http-errors'

import { createFailedResponse } from '../utils/format-response.util.js'

export const errorHandler = (error, req, res, next) => {
  console.log('🚀 ~ errorHandler ~ error:', error)

  let errorMessage = 'An unknown error occurred'
  let statusCode = 500

  if (error instanceof Error || isHttpError(error)) {
    errorMessage = error.message
  }

  if (isHttpError(error)) {
    statusCode = error.status
  }
  res.status(statusCode).json(createFailedResponse(errorMessage))
}

export const notFoundEndPoint = (req, res, next) => {
  next(createHttpError(404, createFailedResponse('Endpoint not found')))
}
