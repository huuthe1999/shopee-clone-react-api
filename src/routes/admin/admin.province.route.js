import { Router } from 'express'

import adminProvinceMiddleware from '../../controllers/admin/admin.province.controller.js'

const adminProvinceRoute = Router()

adminProvinceRoute.route('/:id').get(adminProvinceMiddleware.getProvince)
adminProvinceRoute.route('/').get(adminProvinceMiddleware.getProvinces)

export default adminProvinceRoute
