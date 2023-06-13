import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import { customLabels } from '../utils/pagination.util.js'

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

bannerSchema.set('toJSON', {
  versionKey: false
})

mongoosePaginate.paginate.options = {
  sort: { updatedAt: -1 },
  customLabels
}

bannerSchema.plugin(mongoosePaginate)

const BannerModel = mongoose.model('Banner', bannerSchema)

export default BannerModel
