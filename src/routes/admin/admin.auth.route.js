import { Router } from 'express'

import { ADMIN_EXPIRES_TOKEN_JWT } from '../../constants/index.js'
import adminAuthMiddleware from '../../controllers/admin/admin-auth.controller.js'
import cache from '../../middleware/cache.middleware.js'
const adminAuthRoute = Router()

adminAuthRoute
  .route('/refreshToken')
  .get(cache(ADMIN_EXPIRES_TOKEN_JWT - 60), adminAuthMiddleware.refreshAdminToken)

export default adminAuthRoute
