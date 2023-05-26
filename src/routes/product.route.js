import { Router } from 'express'

import productMiddleware from '../controllers/product.controller.js'

const productRoute = Router()

// productRoute.use(cache(ADMIN_EXPIRES_TOKEN_JWT - 60))

productRoute.route('/:id').get(productMiddleware.getOneProduct)
productRoute.route('/').get(productMiddleware.getProducts)

export default productRoute
