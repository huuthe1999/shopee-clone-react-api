import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'

import { verifyToken } from '../utils/jwt.util.js'

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(createHttpError(401, 'Người dùng chưa xác thực'))
  }
  const token = authHeader.split(' ')[1]

  try {
    const decoded = await verifyToken(token, process.env.TOKEN_SECRET_KEY)
    req.user = decoded.userInfo
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      return next(createHttpError(401, 'Phiên đăng nhập đã hết hạn'))

    next(createHttpError(403, 'Xác thực token xảy ra lỗi'))
  }
}

export default checkAuth
