import { Router } from 'express'

import { ADMIN_EXPIRES_TOKEN_JWT, ROLES } from '../constants/index.js'
import categoryMiddleware from '../controllers/category.controller.js'
import cache from '../middleware/cache.middleware.js'
import checkAuth from '../middleware/check-auth.middleware.js'
import checkRoles from '../middleware/check-roles.middleware.js'

const categoryRoute = Router()

categoryRoute.route('/:id').get(categoryMiddleware.getOneCategory)
categoryRoute.route('/').get(cache(ADMIN_EXPIRES_TOKEN_JWT - 60), categoryMiddleware.getCategories)

categoryRoute.use([checkAuth, checkRoles(ROLES.Admin)])

categoryRoute.route('/').post(categoryMiddleware.createCategory)

export default categoryRoute
