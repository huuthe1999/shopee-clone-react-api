import { Router } from 'express'

import authRoute from './auth.route.js'
import bannerRoute from './banner.route.js'

const indexRoute = Router()

indexRoute.use('/auth', authRoute)
indexRoute.use('/banner', bannerRoute)

export default indexRoute
