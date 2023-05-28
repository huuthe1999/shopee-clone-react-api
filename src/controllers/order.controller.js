import OrderModel from '../models/order.model.js'
import { createFailedResponse, createSuccessResponse } from '../utils/format-response.util.js'
import { getPagination } from '../utils/pagination.util.js'
import myValidationResult from '../validations/base.validate.js'

const addToOrder = async (req, res, next) => {
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

    return res.json(createSuccessResponse('Thêm sản phẩm vào giỏ hàng thành công'))
  } catch (error) {
    next(error)
  }
}

const updateOrder = async (req, res, next) => {
  //actionType is in [1,2] ==> 1:update -  2:delete
  const { amount, orderId, actionType } = req.body

  const errors = myValidationResult(req).array()

  if (errors.length !== 0) {
    return res.status(422).json(createFailedResponse('Vui lòng kiêm tra thông tin', errors))
  }

  try {
    let result
    if (actionType === 1) {
      result = await OrderModel.findOneAndUpdate(
        { _id: orderId },
        { $set: { amount: Number(amount) } },
        { new: true }
      )
    } else {
      result = await OrderModel.findOneAndDelete({ _id: orderId }, { lean: true })
    }
    if (result) {
      return res.json(createSuccessResponse('Cập nhật giỏ hàng thành công', result))
    }
    return res.status(404).json(createFailedResponse('Không tìm thấy giỏ hàng'))
  } catch (error) {
    next(error)
  }
}

const getOrderById = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json(createFailedResponse('Vui lòng truyền id của giỏ hàng'))
  }

  if (id) {
    try {
      const result = await OrderModel.findById(
        id,
        {},
        {
          populate: {
            path: 'product',
            select: 'name image price categorySlug slug isActive discount quantity vouchers'
          }
        }
      )
      if (result) {
        return res.json(createSuccessResponse('Lấy giỏ hàng thành công', result))
      }
      return res.status(404).json(createFailedResponse('Không tìm thấy giỏ hàng'))
    } catch (error) {
      next(error)
    }
  }
}

const getOrder = async (req, res, next) => {
  const { status, page, size } = req.query

  const errors = myValidationResult(req).array()

  if (errors.length !== 0) {
    return res.status(422).json(createFailedResponse('Vui lòng kiêm tra thông tin', errors))
  }

  const { limit, offset } = getPagination(page, size)

  try {
    const result = await OrderModel.paginate(
      { status: Number(status), user: req.userId },
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

const provinceMiddleware = { addToOrder, getOrder, updateOrder, getOrderById }

export default provinceMiddleware
