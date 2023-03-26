import { Router } from 'express'

import authMiddleware from '../controllers/auth.controller.js'
import checkAuth from '../middleware/check-auth.middleware.js'
import { loginLimiter } from '../middleware/login-limiter.middleware.js'
import { authValidator } from '../validations/auth.validate.js'
const authRoute = Router()

authRoute.route('/login').post(loginLimiter, authValidator, authMiddleware.login)
authRoute.route('/register').post(authValidator, authMiddleware.register)
authRoute.route('/refreshToken').post(authMiddleware.refreshToken)
authRoute.route('/logout').post(authMiddleware.logOut)

authRoute.use(checkAuth)

authRoute.route('/me').get(authMiddleware.getProfile)

export default authRoute
