import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'

import {
  ADMIN_EXPIRES_REFRESH_TOKEN_JWT,
  ADMIN_EXPIRES_TOKEN_JWT,
  EXPIRES_REFRESH_TOKEN_JWT,
  EXPIRES_TOKEN_JWT,
  ROLES
} from '../constants/index.js'
import UserModel from '../models/user.model.js'
import { createFailedResponse, createSuccessResponse } from '../utils/format-response.util.js'
import { generateToken, verifyToken } from '../utils/jwt.util.js'
import myValidationResult from '../validations/base.validate.js'

const login = async (req, res, next) => {
  const errors = myValidationResult(req).array()

  if (errors.length !== 0) {
    return res.status(422).json(createFailedResponse('Vui lòng kiêm tra thông tin', errors))
  }

  const { email, password } = req.body

  try {
    const foundUser = await UserModel.findOne({ email }).select('+password').exec()

    if (!foundUser) {
      throw createHttpError(401, 'Email không tồn tại')
    }

    const isMatch = await bcrypt.compare(password, foundUser.password)

    if (!isMatch) {
      throw createHttpError(401, 'Sai thông tin đăng nhập')
    }

    const accessToken = await generateToken(
      {
        userId: foundUser._id
      },
      foundUser.roles.includes(ROLES.Admin)
        ? process.env.ADMIN_TOKEN_SECRET_KEY
        : process.env.TOKEN_SECRET_KEY,
      foundUser.roles.includes(ROLES.Admin) ? ADMIN_EXPIRES_TOKEN_JWT : EXPIRES_TOKEN_JWT
    )

    const refreshToken = await generateToken(
      { userId: foundUser._id },
      foundUser.roles.includes(ROLES.Admin)
        ? process.env.ADMIN_REFRESH_TOKEN_SECRET_KEY
        : process.env.REFRESH_TOKEN_SECRET_KEY,
      foundUser.roles.includes(ROLES.Admin)
        ? ADMIN_EXPIRES_REFRESH_TOKEN_JWT
        : EXPIRES_REFRESH_TOKEN_JWT
    )

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: process.env.NODE_ENV !== 'development', //https
      sameSite: process.env.NODE_ENV !== 'development' ? 'None' : 'Lax', //cross-site cookie
      maxAge:
        (foundUser.roles.includes(ROLES.Admin)
          ? ADMIN_EXPIRES_REFRESH_TOKEN_JWT
          : EXPIRES_REFRESH_TOKEN_JWT) * 1000
    })

    res.json(
      createSuccessResponse('Đăng nhập thành công', {
        accessToken,
        expiresIn: foundUser.roles.includes(ROLES.Admin)
          ? ADMIN_EXPIRES_TOKEN_JWT
          : EXPIRES_TOKEN_JWT,
        user: foundUser
      })
    )
  } catch (error) {
    next(error)
  }
}

const register = async (req, res, next) => {
  const errors = myValidationResult(req).array()

  if (errors.length !== 0) {
    return res.status(422).json(createFailedResponse('Vui lòng kiêm tra thông tin', errors))
  }

  const { email, password } = req.body

  try {
    const existingUser = await UserModel.findOne({ email }).exec()

    if (existingUser) {
      return res.status(422).json(
        createFailedResponse('Vui lòng kiêm tra thông tin', [
          {
            email: 'Email đã tồn tại'
          }
        ])
      )
    }

    // const salt = await bcrypt.genSalt(Number(process.env.SALT));
    // const hashPassword = await bcrypt.hash(req.body.password, salt);
    const passwordHashed = await bcrypt.hash(password, 10)

    let newUser = await UserModel.create({
      email: email,
      password: passwordHashed
    })

    newUser = newUser.toObject()

    res.status(201).json(createSuccessResponse('Đăng kí thành công', { user: newUser }))
  } catch (error) {
    next(error)
  }
}

const getProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.userId).exec()

    if (!user) {
      throw createHttpError(404, 'User không tồn tại')
    }

    res.status(200).json(createSuccessResponse('Lấy thông tin người dùng thành công', user))
  } catch (error) {
    next(error)
  }
}

const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.cookies

  if (!refreshToken) {
    throw createHttpError(401, 'Phiên đăng nhập đã hết hạn')
  }

  try {
    const decoded = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY)

    const foundUser = await UserModel.findById(decoded.userId).exec()
    if (!foundUser) {
      throw createHttpError(404, 'Người dùng không còn tồn tại')
    }

    const accessToken = await generateToken(
      {
        userId: foundUser._id
      },
      process.env.TOKEN_SECRET_KEY,
      EXPIRES_TOKEN_JWT
    )

    res.status(201).json(createSuccessResponse('Lấy lại token thành công', { accessToken }))
  } catch (error) {
    return next(createHttpError(401, 'Phiên đăng nhập đã hết hạn'))
  }
}

const logOut = (req, res, next) => {
  const { refreshToken } = req.cookies
  const successMessage = 'Đăng xuất thành công'

  if (!refreshToken) {
    return next(createHttpError(401, 'Người dùng chưa xác thực'))
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: process.env.NODE_ENV !== 'development' ? 'None' : 'Lax',
    secure: process.env.NODE_ENV !== 'development'
  })
  res.status(200).json(createSuccessResponse(successMessage))
}

const authMiddleware = { login, register, refreshToken, getProfile, logOut }

export default authMiddleware
