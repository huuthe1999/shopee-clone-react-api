import createHttpError from 'http-errors'

const checkRoles = (...allowRoles) => {
  return async (req, res, next) => {
    if (!req?.roles || !allowRoles)
      return next(createHttpError(403, 'Người dùng không có quyền truy cập'))

    const roles = [...allowRoles]

    // // Check if every role in `roles` array exists in the `ROLES` array.
    const result = req.roles.every(role => roles.includes(role))

    if (!result) {
      // Nếu có role không khớp
      return next(createHttpError(403, 'Người dùng không có quyền truy cập'))
    }

    next()
  }
}

export default checkRoles
