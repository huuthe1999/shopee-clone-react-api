import ProductModel from '../models/product.model.js'
import { createFailedResponse, createSuccessResponse } from '../utils/format-response.util.js'
import { getPagination } from '../utils/pagination.util.js'
import { mapFilterByQuery, mapSortByParam } from '../utils/product.util.js'
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
  let { page, size, order, sortBy, categorySlug, minPrice, maxPrice, ...restParams } = req.query

  sortBy = mapSortByParam(sortBy)

  const filterByObject = Object.entries(restParams).map(([key, value]) => {
    const filterBy = mapFilterByQuery(key)
    return {
      [filterBy]: typeof value === 'object' ? [...value] : [value]
    }
  })

  // Only order in price

  const { limit, offset } = getPagination(page, size)

  let queryOptions = categorySlug ? { categorySlug: { $regex: categorySlug, $options: 'i' } } : {}

  if (filterByObject.length > 0) {
    queryOptions = {
      $and: [
        { ...queryOptions },
        ...filterByObject.map(filterObject => {
          const [[key, value]] = Object.entries(filterObject)

          // Set condition field by using $gte operator
          if (key === 'rating') {
            return {
              [key]: { $gte: Number(value[0]) }
            }
          }

          // Default set condition field by using $in or $eq operator
          return {
            [key]: { $in: value }
          }
        })
      ]
    }
  }

  // Set condition price field
  if (minPrice || maxPrice) {
    const priceOption =
      minPrice && maxPrice
        ? { $and: [{ price: { $gte: Number(minPrice) } }, { price: { $lte: Number(maxPrice) } }] }
        : {
            price: minPrice ? { $gte: Number(minPrice) } : { $lte: Number(maxPrice) }
          }

    queryOptions = {
      ...queryOptions,
      $and: [
        ...(queryOptions.$and || []),
        {
          ...priceOption
        }
      ]
    }
  }

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
