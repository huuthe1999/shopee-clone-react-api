import WardModel from '../models/ward.model.js'
import { createFailedResponse, createSuccessResponse } from '../utils/format-response.util.js'

const getWards = async (req, res, next) => {
  const { districtId } = req.query

  if (!districtId) {
    return res.status(400).json(createFailedResponse('Vui lòng truyền id của quận/huyện'))
  }

  try {
    let result = await WardModel.find({
      districtId
    }).exec()

    // Sort in alphabet
    result = result.sort((a, b) => a.name.localeCompare(b.name))

    return res
      .status(201)
      .json(createSuccessResponse('Lấy danh sách quận/huyện thành công', result))
  } catch (error) {
    next(error)
  }
}

const getWard = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json(createFailedResponse('Vui lòng truyền id của quận/huyện'))
  }

  try {
    const result = await WardModel.findById(id)

    return res.status(201).json(createSuccessResponse('Lấy quận/huyện thành công', result))
  } catch (error) {
    next(error)
  }
}

const wardMiddleware = { getWards, getWard }

export default wardMiddleware
