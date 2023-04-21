import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'

import UserModel from '../models/user.model.js'
import { verifyToken } from '../utils/jwt.util.js'

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(createHttpError(401, 'Người dùng cần xác thực'))
  }
  const token = authHeader.split(' ')[1]

  try {
    const decoded = await verifyToken(token, process.env.TOKEN_SECRET_KEY)

    const findUser = await UserModel.findById(decoded.userId).exec()
    console.log('🚀 ~ checkAuth ~ findUser:', findUser)

    if (findUser) {
      req.userId = decoded.userId
      req.roles = findUser.roles
      next()
    } else {
      next(createHttpError(403, 'Xác thực người dùng xảy ra lỗi'))
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) return next(createHttpError(401, 'TOKEN_EXPIRED'))

    return next(createHttpError(403, 'Xác thực token xảy ra lỗi'))
  }
}

export default checkAuth
