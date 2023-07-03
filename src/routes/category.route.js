import { Router } from 'express'

import { ROLES } from '../constants/index.js'
import categoryMiddleware from '../controllers/category.controller.js'
import checkAuth from '../middleware/check-auth.middleware.js'
import checkRoles from '../middleware/check-roles.middleware.js'

const categoryRoute = Router()

categoryRoute.route('/:id').get(categoryMiddleware.getCategory)
categoryRoute.route('/').get(categoryMiddleware.getCategories)

categoryRoute.use([checkAuth, checkRoles(ROLES.Admin)])

categoryRoute.route('/').post(categoryMiddleware.createCategory)

export default categoryRoute
