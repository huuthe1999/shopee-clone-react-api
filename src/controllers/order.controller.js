import OrderModel from '../models/order.model.js'
import ProductModel from '../models/product.model.js'
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
  const { amount, orderId, actionType, productId } = req.body

  const errors = myValidationResult(req).array()

  if (errors.length !== 0) {
    return res.status(422).json(createFailedResponse('Vui lòng kiêm tra thông tin', errors))
  }

  try {
    let result
    if (actionType === 0) {
      const product = await ProductModel.findOne({
        _id: productId,
        quantity: { $gte: Number(amount) }
      })
      if (product) {
        result = await OrderModel.findOneAndUpdate(
          { _id: orderId, user: req.userId },
          { $set: { amount: Number(amount) } },
          {
            new: true,
            populate: {
              path: 'product',
              select: 'name image price categorySlug slug isActive discount quantity vouchers'
            }
          }
        )

        if (result) {
          return res.json(createSuccessResponse('Cập nhật sản phẩm thành công', result))
        }
      }
    } else {
      result = await OrderModel.deleteOne({ _id: orderId, user: req.userId })
      if (result.deletedCount === 1) {
        return res.json(createSuccessResponse('Xoá sản phẩm thành công'))
      }
    }

    return res.status(400).json(createFailedResponse('Cập nhật giỏ hàng thất bại`'))
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
      const result = await OrderModel.findOne(
        { _id: id, user: req.userId },
        {},
        {
          populate: {
            path: 'product',
            select: 'name image price categorySlug slug isActive discount quantity vouchers'
          }
        }
      ).exec()

      if (result) {
        return res.json(createSuccessResponse('Lấy giỏ hàng thành công', result))
      }
      return res.status(400).json(createFailedResponse('Lấy giỏ hàng thất bại'))
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
        populate: {
          path: 'product',
          select: 'name image price categorySlug slug isActive discount quantity vouchers'
        },
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
