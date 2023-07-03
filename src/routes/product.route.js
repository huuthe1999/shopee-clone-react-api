import { Router } from 'express'

import productMiddleware from '../controllers/product.controller.js'

const productRoute = Router()

// productRoute.use(cache())

productRoute.route('/:id').patch(productMiddleware.updateProduct)
productRoute.route('/:id').get(productMiddleware.getOneProduct)
productRoute.route('/').get(productMiddleware.getProducts)

export default productRoute
