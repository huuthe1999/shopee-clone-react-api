import { Router } from 'express'

import provinceMiddleware from '../controllers/province.controller.js'

const provinceRoute = Router()

provinceRoute.route('/:id').get(provinceMiddleware.getProvince)
provinceRoute.route('/').get(provinceMiddleware.getProvinces)

export default provinceRoute
