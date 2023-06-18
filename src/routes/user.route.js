import { Router } from 'express'

import userMiddleware from '../controllers/user.controller.js'
import checkAuth from '../middleware/check-auth.middleware.js'
import { rateLimiter } from '../middleware/rate-limiter.middleware.js'

const userRoute = Router()

userRoute.use([checkAuth])

userRoute.route('/profile').get(userMiddleware.getProfile)
userRoute.route('/profile').patch(rateLimiter(5), userMiddleware.updateProfile)

export default userRoute
