import { Router } from 'express'

import { ROLES } from '../constants/index.js'
import productMiddleware from '../controllers/product.controller.js'
import checkAuth from '../middleware/check-auth.middleware.js'
import checkRoles from '../middleware/check-roles.middleware.js'
import { productValidator } from '../validations/product.validate.js'

const productRoute = Router()

// productRoute.use(cache(ADMIN_EXPIRES_TOKEN_JWT - 60))

productRoute.route('/:id').get(productMiddleware.getOneProduct)
productRoute.route('/').get(productMiddleware.getProducts)

productRoute.use([checkAuth, checkRoles(ROLES.Admin)])

productRoute.route('/').post(productValidator, productMiddleware.createProduct)

export default productRoute
