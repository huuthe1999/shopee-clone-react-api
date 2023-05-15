import slugify from 'slugify'

import ProductModel from '../../models/product.model.js'
import { createFailedResponse, createSuccessResponse } from '../../utils/format-response.util.js'
import { mapSortByParam } from '../../utils/product.util.js'
import myValidationResult from '../../validations/base.validate.js'

const createProduct = async (req, res, next) => {
  const errors = myValidationResult(req).array()

  if (errors.length !== 0) {
    return res.status(422).json(createFailedResponse('Vui lòng kiêm tra thông tin', errors))
  }

  try {
    const result = await ProductModel.create({
      ...req.body,
      user: req.userId
    })

    return res.status(201).json(createSuccessResponse('Tạo Product thành công', result))
  } catch (error) {
    next(error)
  }
}

const getOneProduct = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json(createFailedResponse('Vui lòng truyền id của sản phẩm'))
  }

  try {
    const result = await ProductModel.findById(id).lean().exec()
    return res.status(201).json(createSuccessResponse('Lấy sản phẩm thành công', result))
  } catch (error) {
    console.log('🚀 ~ createProduct ~ error:', error)

    next(error)
  }
}

const getProducts = async (req, res, next) => {
  let { _start = 1, _end = 10, order, sortBy, category, name } = req.query

  sortBy = mapSortByParam(sortBy)

  let findOptions = category ? { category: { $in: category } } : {}

  if (name) {
    const slugName = slugify(name, {
      strict: true,
      locale: 'vi',
      lower: false
    })

    findOptions = { $and: [{ ...findOptions }, { slug: { $regex: slugName, $options: 'i' } }] }
  }

  try {
    const result = await ProductModel.paginate(findOptions, {
      offset: +_start,
      limit: +_end - +_start,
      sort: { [sortBy]: order ?? -1 }
    })

    res.set('x-total-count', result.totalItems)
    res.set('Access-Control-Expose-Headers', 'x-total-count')

    return res.status(201).send(result.items)
  } catch (error) {
    next(error)
  }
}

const adminProductMiddleware = { createProduct, getOneProduct, getProducts }

export default adminProductMiddleware
