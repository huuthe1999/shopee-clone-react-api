import { Router } from 'express'

import { ROLES } from '../../constants/index.js'
import adminCategoryMiddleware from '../../controllers/admin/admin.category.controller.js'
import checkAdminAuth from '../../middleware/admin/check-admin-auth.middleware.js'
import checkRoles from '../../middleware/check-roles.middleware.js'

const categoryRoute = Router()

categoryRoute.use([checkAdminAuth, checkRoles(ROLES.Admin)])

categoryRoute.route('/:id').get(adminCategoryMiddleware.getOneCategory)
categoryRoute.route('/:id').patch(adminCategoryMiddleware.updateCategory)
categoryRoute.route('/').get(adminCategoryMiddleware.getCategories)

categoryRoute.route('/').post(adminCategoryMiddleware.createCategory)

export default categoryRoute
