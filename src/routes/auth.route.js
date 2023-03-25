import { Router } from 'express'

import authMiddleware from '../controllers/auth.controller.js'
import { loginLimiter } from '../middleware/auth.middleware.js'
const authRoute = Router()

authRoute.route('/').post(loginLimiter, authMiddleware.login)

export default authRoute
