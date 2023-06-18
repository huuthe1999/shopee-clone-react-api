import { Router } from 'express'

import uploadMiddleware from '../controllers/upload.controller.js'
import checkAuth from '../middleware/check-auth.middleware.js'

const uploadRoute = Router()

uploadRoute.use([checkAuth])

uploadRoute.route('/').post(uploadMiddleware.uploadImage)

export default uploadRoute
