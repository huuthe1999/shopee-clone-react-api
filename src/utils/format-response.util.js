export const createSuccessResponse = (msg, data) => ({
  isSuccess: true,
  message: msg,
  data
})

export const createFailedResponse = (msg, errors) => ({
  isSuccess: false,
  message: msg,
  errors
})
