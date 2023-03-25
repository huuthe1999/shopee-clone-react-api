import { createHttpError } from 'http-errors'
import { verify } from 'jsonwebtoken'

const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader.startWiths('Bearer ')) {
    next(createHttpError(401, 'User is not authenticated'))
  }
  const token = authHeader.split(' ')[1]

  verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) next(createHttpError(403, 'User is forbidden'))
    req.user.id = decoded.id
    next()
  })
}

export default checkAuth
