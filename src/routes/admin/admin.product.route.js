import { Router } from 'express'

import { ROLES } from '../../constants/index.js'
import adminProductMiddleware from '../../controllers/admin/admin.product.controller.js'
import checkAdminAuth from '../../middleware/admin/check-admin-auth.middleware.js'
import checkRoles from '../../middleware/check-roles.middleware.js'

const productRoute = Router()

productRoute.use([checkAdminAuth, checkRoles(ROLES.Admin)])

productRoute.route('/:id').get(adminProductMiddleware.getOneProduct)
productRoute.route('/').get(adminProductMiddleware.getProducts)

productRoute.route('/').post(adminProductMiddleware.createProduct)

export default productRoute
