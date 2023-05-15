import ProductModel from '../models/product.model.js'
import { createFailedResponse, createSuccessResponse } from '../utils/format-response.util.js'
import { getPagination } from '../utils/pagination.util.js'
import { mapSortByParam } from '../utils/product.util.js'
import myValidationResult from '../validations/base.validate.js'

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
  let { page, size, order, sortBy, categorySlug } = req.query

  sortBy = mapSortByParam(sortBy)

  // Only order in price

  const { limit, offset } = getPagination(page, size)

  const queryOptions = categorySlug ? { categorySlug: { $regex: categorySlug, $options: 'i' } } : {}
  try {
    const result = await ProductModel.paginate(queryOptions, {
      offset,
      limit,
      // sort: { sortBy: sortBy === 'price' ? order : -1 }
      sort: { [sortBy]: order ?? -1 }
    })

    // res.set('x-total-count', result.totalPages)
    // res.set('Access-Control-Expose-Headers', 'x-total-count')

    return res.status(201).json(createSuccessResponse('Lấy sản phẩm thành công', result))
  } catch (error) {
    next(error)
  }
}

const productMiddleware = { createProduct, getOneProduct, getProducts }

export default productMiddleware
