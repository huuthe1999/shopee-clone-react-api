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
      { product: productId, status: -1 },
      { ...rest, product: productId, user: req.userId, $inc: { amount: Number(amount) } },
      { upsert: true }
    )

    return res.json(createSuccessResponse('Thêm sản phẩm vào giỏ hàng thành công'))
  } catch (error) {
    next(error)
  }
}

const updateOrder = async (req, res, next) => {
  //actionType is in [0,1] ==> 0:update - 1:delete
  const { amount, orderId, actionType, productId, orderIds } = req.body

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
          { _id: orderId, user: req.userId, product: productId },
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
          return res.json(createSuccessResponse('Cập nhật giỏ hàng thành công', result))
        }
      }
    } else {
      const promises = orderIds.map(
        async _id => await OrderModel.deleteOne({ _id, user: req.userId })
      )
      const result = await Promise.all(promises)
      if (result.length === orderIds.length) {
        return res.json(createSuccessResponse('Xoá giỏ hàng thành công'))
      }
    }

    return res.status(400).json(createFailedResponse('Cập nhật giỏ hàng thất bại'))
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

const checkOutOrder = async (req, res, next) => {
  const { data } = req.body

  const errors = myValidationResult(req).array()

  if (errors.length !== 0) {
    return res.status(422).json(createFailedResponse('Vui lòng kiêm tra thông tin', errors))
  }

  try {
    const orderPromises = data.map(async orderId => {
      const order = await OrderModel.findOne({ _id: orderId, user: req.userId })

      const { matchedCount } = await ProductModel.updateOne(
        {
          _id: order.product,
          quantity: { $gte: Number(order.amount) }
        },
        {
          $inc: { quantity: -Number(order.amount), sold: Number(order.amount) }
        },
        { new: true }
      )

      if (matchedCount > 0) {
        await OrderModel.updateOne({ _id: orderId, user: req.userId }, { $set: { status: 1 } })
        return Promise.resolve(`Đặt đơn hàng ${orderId} thành công`)
      } else {
        return Promise.reject(`Lỗi tại order ${orderId}`)
      }
    })

    const result = await Promise.allSettled(orderPromises)

    return res.json(createSuccessResponse('Đặt đơn hàng thành công', result))
  } catch (error) {
    next(error)
  }
}

const provinceMiddleware = { addToOrder, getOrder, updateOrder, getOrderById, checkOutOrder }

export default provinceMiddleware
