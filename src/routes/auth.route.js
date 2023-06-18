import { Router } from 'express'

import { EXPIRES_TOKEN_JWT } from '../constants/index.js'
import authMiddleware from '../controllers/auth.controller.js'
import cache from '../middleware/cache.middleware.js'
import { rateLimiter } from '../middleware/rate-limiter.middleware.js'
import { authValidator } from '../validations/auth.validate.js'
const authRoute = Router()

authRoute.route('/login').post(rateLimiter(), authValidator, authMiddleware.login)
authRoute.route('/register').post(authValidator, authMiddleware.register)
authRoute.route('/refreshToken').get(cache(EXPIRES_TOKEN_JWT - 60), authMiddleware.refreshToken)
authRoute.route('/logout').post(authMiddleware.logOut)

export default authRoute
