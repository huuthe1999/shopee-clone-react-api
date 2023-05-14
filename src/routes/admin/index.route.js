import { Router } from 'express'

import adminAuthRoute from './admin.auth.route.js'
import adminCategoryRoute from './admin.category.route.js'
import adminProductRoute from './admin.product.route.js'
import adminProvinceRoute from './admin.province.route.js'

const adminRoute = Router()

adminRoute.use('/categories', adminCategoryRoute)
adminRoute.use('/products', adminProductRoute)
adminRoute.use('/auth', adminAuthRoute)
adminRoute.use('/provinces', adminProvinceRoute)

export default adminRoute
