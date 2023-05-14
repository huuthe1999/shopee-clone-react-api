import createHttpError from 'http-errors'

import { ADMIN_EXPIRES_TOKEN_JWT } from '../../constants/index.js'
import UserModel from '../../models/user.model.js'
import { createSuccessResponse } from '../../utils/format-response.util.js'
import { generateToken, verifyToken } from '../../utils/jwt.util.js'

const refreshAdminToken = async (req, res, next) => {
  const { refreshToken } = req.cookies

  if (!refreshToken) {
    throw createHttpError(401, 'Phiên đăng nhập đã hết hạn')
  }

  try {
    const decoded = await verifyToken(refreshToken, process.env.ADMIN_REFRESH_TOKEN_SECRET_KEY)

    const foundUser = await UserModel.findById(decoded.userId).exec()
    if (!foundUser) {
      throw createHttpError(404, 'Người dùng không còn tồn tại')
    }

    const accessToken = await generateToken(
      {
        userId: foundUser._id
      },
      process.env.ADMIN_TOKEN_SECRET_KEY,
      ADMIN_EXPIRES_TOKEN_JWT
    )

    res.status(201).json(createSuccessResponse('Lấy lại token thành công', { accessToken }))
  } catch (error) {
    return next(createHttpError(401, 'Phiên đăng nhập đã hết hạn'))
  }
}

const adminAuthMiddleware = { refreshAdminToken }

export default adminAuthMiddleware
