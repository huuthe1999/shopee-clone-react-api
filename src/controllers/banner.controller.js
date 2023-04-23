import createHttpError from 'http-errors'

import BannerModel from '../models/banner.model.js'
import { createFailedResponse, createSuccessResponse } from '../utils/format-response.util.js'
import { getPagination } from '../utils/pagination.util.js'
import myValidationResult from '../validations/base.validate.js'

const getCateBanners = async (req, res, next) => {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)

  try {
    const result = await BannerModel.paginate(
      {},
      {
        offset,
        limit,
        select: 'image text'
      }
    )
    res.status(200).json(createSuccessResponse('Lấy thông tin danh mục banner thành công', result))
  } catch (error) {
    next(error)
  }
}

const createCateBanner = async (req, res, next) => {
  const errors = myValidationResult(req).array()

  if (errors.length !== 0) {
    return res.status(422).json(createFailedResponse('Vui lòng kiêm tra thông tin', errors))
  }

  const { image, text } = req.body
  try {
    let result = await BannerModel.create({
      image,
      text
    })

    result = result.toJSON()

    return res.status(201).json(createSuccessResponse('Tạo category banner thành công', result))
  } catch (error) {
    next(error)
  }
}

const createManyCateBanner = async (req, res, next) => {
  const data = req.body

  if (!Array.isArray(data) || !data.length) {
    throw createHttpError(422, 'Mảng danh mục banner không được rỗng')
  }

  const errors = myValidationResult(req).array()

  if (errors.length !== 0) {
    return res.status(422).json(createFailedResponse('Vui lòng kiêm tra thông tin', errors))
  }

  try {
    let result = await BannerModel.insertMany(data)

    result.forEach(item => item.toJSON())

    return res.status(201).json(createSuccessResponse('Tạo category banner thành công', result))
  } catch (error) {
    next(error)
  }
}

const bannerMiddleware = { getCateBanners, createCateBanner, createManyCateBanner }

export default bannerMiddleware
