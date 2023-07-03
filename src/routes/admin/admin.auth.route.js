import { Router } from 'express'

import adminAuthMiddleware from '../../controllers/admin/admin-auth.controller.js'
const adminAuthRoute = Router()

adminAuthRoute.route('/refreshToken').get(adminAuthMiddleware.refreshAdminToken)

export default adminAuthRoute
