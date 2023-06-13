import { Router } from 'express'

import addressRoute from './address.route.js'
import authRoute from './auth.route.js'
import bannerRoute from './banner.route.js'
import categoryRoute from './category.route.js'
import districtRoute from './district.route.js'
import orderRoute from './order.route.js'
import productRoute from './product.route.js'
import provinceRoute from './province.route.js'
import wardRoute from './ward.route.js'

const indexRoute = Router()

indexRoute.use('/auth', authRoute)
indexRoute.use('/banner', bannerRoute)
indexRoute.use('/categories', categoryRoute)
indexRoute.use('/products', productRoute)
indexRoute.use('/orders', orderRoute)
indexRoute.use('/provinces', provinceRoute)
indexRoute.use('/districts', districtRoute)
indexRoute.use('/wards', wardRoute)
indexRoute.use('/addresses', addressRoute)

export default indexRoute
