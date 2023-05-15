import CategoryModel from '../models/category.model.js'
import { createFailedResponse, createSuccessResponse } from '../utils/format-response.util.js'
import { getPagination } from '../utils/pagination.util.js'

const createCategory = async (req, res, next) => {
  const { name } = req.body

  if (!name) {
    return res.status(422).json(
      createFailedResponse('Vui lòng kiêm tra thông tin', {
        name: 'Tên danh mục không được rỗng'
      })
    )
  }

  try {
    const result = await CategoryModel.create({
      name,
      ...req.body,
      user: req.userId
    })

    return res.status(201).json(createSuccessResponse('Tạo category thành công', result))
  } catch (error) {
    next(error)
  }
}

const getOneCategory = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json(createFailedResponse('Vui lòng truyền id của danh mục'))
  }

  try {
    const result = await CategoryModel.findById(id).lean().exec()
    return res.status(201).json(createSuccessResponse('Lấy danh mục thành công', result))
  } catch (error) {
    console.log('🚀 ~ createCategory ~ error:', error)

    next(error)
  }
}

const getCategories = async (req, res, next) => {
  const { page, size, select } = req.query
  const { limit, offset } = getPagination(page, size)
  try {
    const result = await CategoryModel.paginate(
      {},
      {
        select: select ? select : {},
        offset,
        limit
      }
    )

    res.set('x-total-count', result.totalPages)
    res.set('Access-Control-Expose-Headers', 'x-total-count')

    return res.status(201).json(createSuccessResponse('Lấy danh mục thành công', result))
  } catch (error) {
    next(error)
  }
}

const categoryMiddleware = { createCategory, getOneCategory, getCategories }

export default categoryMiddleware
