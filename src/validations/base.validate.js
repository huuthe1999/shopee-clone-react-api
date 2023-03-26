import { validationResult } from 'express-validator'
const myValidationResult = validationResult.withDefaults({
  formatter: ({ msg, param, nestedErrors }) => ({
    msg,
    param,
    ...(nestedErrors && nestedErrors.length !== 0 && { nestedErrors })
  })
})
export default myValidationResult
