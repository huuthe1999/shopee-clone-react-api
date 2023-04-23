import { Router } from 'express'

import bannerMiddleware from '../controllers/banner.controller.js'
import { cateBannerValidator, manyCateBannerValidator } from '../validations/banner.validate.js'

const bannerRoute = Router()

bannerRoute.route('/').get(bannerMiddleware.getCateBanners)
bannerRoute.route('/').post(cateBannerValidator, bannerMiddleware.createCateBanner)
bannerRoute.route('/multiple').post(manyCateBannerValidator, bannerMiddleware.createManyCateBanner)

export default bannerRoute
