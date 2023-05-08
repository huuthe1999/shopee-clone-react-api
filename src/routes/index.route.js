import { Router } from 'express'

import authRoute from './auth.route.js'
import bannerRoute from './banner.route.js'
import categoryRoute from './category.route.js'
import productRoute from './product.route.js'
import provinceRoute from './province.route.js'

const indexRoute = Router()

indexRoute.use('/auth', authRoute)
indexRoute.use('/banner', bannerRoute)
indexRoute.use('/categories', categoryRoute)
indexRoute.use('/products', productRoute)
indexRoute.use('/provinces', provinceRoute)

export default indexRoute
