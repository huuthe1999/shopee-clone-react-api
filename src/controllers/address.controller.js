import AddressModel from '../models/address.model.js'
import { createFailedResponse, createSuccessResponse } from '../utils/format-response.util.js'
import myValidationResult from '../validations/base.validate.js'

const getAddresses = async (req, res, next) => {
  try {
    const result = await AddressModel.find({
      userId: req.userId
    })
      .sort({ updatedAt: -1 })
      .exec()

    return res.json(createSuccessResponse('Lấy danh sách địa chỉ thành công', result))
  } catch (error) {
    next(error)
  }
}

const setDefaultOrSelectedAddress = async (req, res, next) => {
  const { id } = req.params
  const { type } = req.body
  console.log('🚀 ~ setDefaultOrSelectedAddress ~ type:', type)

  if (!id || type === undefined) {
    return res.status(400).json(createFailedResponse('Vui lòng truyền id/type của địa chỉ'))
  }

  try {
    const updateField = type === 0 ? 'isDefault' : 'isSelected'

    await AddressModel.updateMany(
      {
        userId: req.userId,
        _id: { $ne: id },
        [updateField]: true
      },
      {
        [updateField]: false
      }
    ).exec()

    await AddressModel.updateOne(
      {
        userId: req.userId,
        _id: id,
        [updateField]: false
      },
      {
        [updateField]: true
      }
    ).exec()

    return res.json(createSuccessResponse('Cập nhật địa chỉ thành công'))
  } catch (error) {
    next(error)
  }
}

const getAddress = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json(createFailedResponse('Vui lòng truyền id của tỉnh/thành phố'))
  }

  try {
    const result = await AddressModel.findById(id)

    return res.status(201).json(createSuccessResponse('Lấy tỉnh/thành phố thành công', result))
  } catch (error) {
    next(error)
  }
}

const createAddress = async (req, res, next) => {
  const errors = myValidationResult(req).array()

  if (errors.length !== 0) {
    return res.status(422).json(createFailedResponse('Vui lòng kiêm tra thông tin', errors))
  }

  try {
    const result = await AddressModel.create({ ...req.body, userId: req.userId })
    return res.status(201).json(createSuccessResponse('Tạo địa chỉ thành công', result))
  } catch (error) {
    next(error)
  }
}

const updateAddress = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json(createFailedResponse('Vui lòng truyền id của địa chỉ'))
  }

  const errors = myValidationResult(req).array()

  if (errors.length !== 0) {
    return res.status(422).json(createFailedResponse('Vui lòng kiêm tra thông tin', errors))
  }

  try {
    const { matchedCount } = await AddressModel.updateOne({ userId: req.userId }, { ...req.body })
    if (matchedCount > 0) {
      return res.status(201).json(createSuccessResponse('Cập nhật địa chỉ thành công'))
    }
    return next('Cập nhật địa chỉ thất bại')
  } catch (error) {
    next(error)
  }
}

const deleteAddress = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json(createFailedResponse('Vui lòng truyền id của địa chỉ'))
  }

  try {
    const { deletedCount } = await AddressModel.deleteOne({ userId: req.userId, _id: id })
    if (deletedCount > 0) {
      return res.json(createSuccessResponse('Xóa địa chỉ thành công'))
    }
    return res.status(404).json(createFailedResponse('Xóa địa chỉ thất bại'))
  } catch (error) {
    next(error)
  }
}

const addressMiddleware = {
  getAddresses,
  getAddress,
  createAddress,
  setDefaultOrSelectedAddress,
  updateAddress,
  deleteAddress
}

export default addressMiddleware
