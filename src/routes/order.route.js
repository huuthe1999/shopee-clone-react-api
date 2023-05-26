import { Router } from 'express'

import orderMiddleware from '../controllers/order.controller.js'
import checkAuth from '../middleware/check-auth.middleware.js'
import { createOrderValidator, getOrderValidator } from '../validations/order.validate.js'

const orderRoute = Router()

// productRoute.use(cache(ADMIN_EXPIRES_TOKEN_JWT - 60))
orderRoute.use([checkAuth])

orderRoute.route('/').get(getOrderValidator, orderMiddleware.getCart)
orderRoute.route('/').post(createOrderValidator, orderMiddleware.addToCart)

export default orderRoute
