import { Router } from 'express'

import districtMiddleware from '../controllers/district.controller.js'

const districtRoute = Router()

districtRoute.route('/:id').get(districtMiddleware.getDistrict)
districtRoute.route('/').get(districtMiddleware.getDistricts)

export default districtRoute
