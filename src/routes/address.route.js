import { Router } from 'express'

import addressMiddleware from '../controllers/address.controller.js'
import checkAuth from '../middleware/check-auth.middleware.js'
import { createAddressValidator } from '../validations/address.validate.js'

const addressRoute = Router()

addressRoute.use([checkAuth])

addressRoute.route('/:id').get(addressMiddleware.getAddress)
addressRoute.route('/:id').delete(addressMiddleware.deleteAddress)
addressRoute.route('/:id').put(createAddressValidator, addressMiddleware.updateAddress)
addressRoute.route('/:id').patch(addressMiddleware.setDefaultOrSelectedAddress)
addressRoute.route('/').get(addressMiddleware.getAddresses)
addressRoute.route('/').post(createAddressValidator, addressMiddleware.createAddress)

export default addressRoute
