import { Router } from 'express'

import { EXPIRES_TOKEN_JWT, ROLES } from '../constants/index.js'
import authMiddleware from '../controllers/auth.controller.js'
import cache from '../middleware/cache.middleware.js'
import checkAuth from '../middleware/check-auth.middleware.js'
import checkRoles from '../middleware/check-roles.middleware.js'
import { loginLimiter } from '../middleware/login-limiter.middleware.js'
import { authValidator } from '../validations/auth.validate.js'
const authRoute = Router()

authRoute.route('/login').post(loginLimiter, authValidator, authMiddleware.login)
authRoute.route('/register').post(authValidator, authMiddleware.register)
authRoute.route('/refreshToken').get(cache(EXPIRES_TOKEN_JWT - 60), authMiddleware.refreshToken)
authRoute.route('/logout').post(authMiddleware.logOut)

authRoute.use(checkAuth)

authRoute.route('/me').get(checkRoles(ROLES.User, ROLES.Admin), authMiddleware.getProfile)

export default authRoute
