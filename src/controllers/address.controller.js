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

const setDefaultAddress = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json(createFailedResponse('Vui lòng truyền id của địa chỉ'))
  }

  try {
    await AddressModel.updateMany(
      {
        _id: { $ne: id },
        isSelected: true
      },
      {
        isSelected: false
      }
    ).exec()

    await AddressModel.updateOne(
      {
        _id: id,
        isSelected: false
      },
      {
        isSelected: true
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

const addressMiddleware = { getAddresses, getAddress, createAddress, setDefaultAddress }

export default addressMiddleware
