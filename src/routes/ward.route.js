import { Router } from 'express'

import wardMiddleware from '../controllers/ward.controller.js'

const wardRoute = Router()

wardRoute.route('/:id').get(wardMiddleware.getWard)
wardRoute.route('/').get(wardMiddleware.getWards)

export default wardRoute
