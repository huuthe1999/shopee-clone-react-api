import DistrictModel from '../models/district.model.js'
import { createFailedResponse, createSuccessResponse } from '../utils/format-response.util.js'

const getDistricts = async (req, res, next) => {
  const { provinceId } = req.query

  if (!provinceId) {
    return res.status(400).json(createFailedResponse('Vui lòng truyền id của tỉnh/thành phố'))
  }

  try {
    let result = await DistrictModel.find({
      provinceId
    }).exec()

    // Sort in alphabet
    result = result.sort((a, b) => a.name.localeCompare(b.name))

    return res
      .status(201)
      .json(createSuccessResponse('Lấy danh sách tỉnh/thành phố thành công', result))
  } catch (error) {
    next(error)
  }
}

const getDistrict = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json(createFailedResponse('Vui lòng truyền id của tỉnh/thành phố'))
  }

  try {
    const result = await DistrictModel.findById(id)

    return res.status(201).json(createSuccessResponse('Lấy tỉnh/thành phố thành công', result))
  } catch (error) {
    next(error)
  }
}

const districtMiddleware = { getDistricts, getDistrict }

export default districtMiddleware
