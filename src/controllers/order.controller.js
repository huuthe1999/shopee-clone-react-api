import OrderModel from '../models/order.model.js'
import { createFailedResponse, createSuccessResponse } from '../utils/format-response.util.js'
import { getPagination } from '../utils/pagination.util.js'
import myValidationResult from '../validations/base.validate.js'

const addToCart = async (req, res, next) => {
  const { amount, productId, ...rest } = req.body

  const errors = myValidationResult(req).array()

  if (errors.length !== 0) {
    return res.status(422).json(createFailedResponse('Vui lòng kiêm tra thông tin', errors))
  }

  try {
    await OrderModel.updateOne(
      { product: productId },
      { ...rest, product: productId, user: req.userId, $inc: { amount: Number(amount) } },
      { upsert: true }
    )
    // await OrderModel.create({
    //   ...req.body,
    //   product: productId,
    //   user: req.userId
    // })

    return res.json(createSuccessResponse('Thêm sản phẩm vào giỏ hàng thành công'))
  } catch (error) {
    next(error)
  }
}

const getCart = async (req, res, next) => {
  const { status, page, size } = req.query

  const errors = myValidationResult(req).array()

  if (errors.length !== 0) {
    return res.status(422).json(createFailedResponse('Vui lòng kiêm tra thông tin', errors))
  }

  const { limit, offset } = getPagination(page, size)

  try {
    const result = await OrderModel.paginate(
      { status: Number(status) },
      {
        offset,
        limit,
        sort: {
          updatedAt: -1,
          createdAt: -1
        }
      }
    )

    return res.json(createSuccessResponse('Lấy danh sách giỏ hàng thành công', result))
  } catch (error) {
    next(error)
  }
}

const provinceMiddleware = { addToCart, getCart }

export default provinceMiddleware
