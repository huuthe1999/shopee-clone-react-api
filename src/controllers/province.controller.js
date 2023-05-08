import ProvinceModel from '../models/province.model.js'
import { createFailedResponse, createSuccessResponse } from '../utils/format-response.util.js'

const getProvinces = async (req, res, next) => {
  try {
    const result = await ProvinceModel.find()
      .sort({
        name: 1
      })
      .exec()

    return res
      .status(201)
      .json(createSuccessResponse('Lấy danh sách tỉnh thành thành công', result))
  } catch (error) {
    next(error)
  }
}

const getProvince = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json(createFailedResponse('Vui lòng truyền id của tỉnh thành'))
  }

  try {
    const result = await ProvinceModel.findById(id)

    return res.status(201).json(createSuccessResponse('Lấy tỉnh thành thành công', result))
  } catch (error) {
    next(error)
  }
}

const provinceMiddleware = { getProvinces, getProvince }

export default provinceMiddleware
