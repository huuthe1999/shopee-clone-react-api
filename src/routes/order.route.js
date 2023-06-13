import { Router } from 'express'

import orderMiddleware from '../controllers/order.controller.js'
import checkAuth from '../middleware/check-auth.middleware.js'
import {
  checkoutOrderValidator,
  createOrderValidator,
  getOrderValidator,
  updateOrderValidator
} from '../validations/order.validate.js'

const orderRoute = Router()

// productRoute.use(cache(ADMIN_EXPIRES_TOKEN_JWT - 60))
orderRoute.use([checkAuth])

orderRoute.route('/:id').get(getOrderValidator, orderMiddleware.getOrderById)
orderRoute.route('/').get(getOrderValidator, orderMiddleware.getOrder)
orderRoute.route('/').patch(updateOrderValidator, orderMiddleware.updateOrder)
orderRoute.route('/').post(createOrderValidator, orderMiddleware.addToOrder)
orderRoute.route('/checkout').post(checkoutOrderValidator, orderMiddleware.checkOutOrder)

export default orderRoute
