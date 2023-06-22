import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'

import UserModel from '../models/user.model.js'
import { createSuccessResponse } from '../utils/format-response.util.js'

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

const updateProfile = async (req, res, next) => {
  let { password } = req.body
  if (password) {
    password = await bcrypt.hash(password, 10)
  }
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: req.userId },
      { ...req.body, password }
    ).exec()

    if (user) {
      return res.json(createSuccessResponse('Cập nhật thông tin người dùng thành công', user))
    }
    return next('Cập nhật thông tin người dùng thất bại')
  } catch (error) {
    next(error)
  }
}

const userMiddleware = { getProfile, updateProfile }

export default userMiddleware
