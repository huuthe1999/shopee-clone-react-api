import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import slugify from 'slugify'

import { customLabels } from '../utils/pagination.util.js'

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dknvhah81/image/upload/v1683274837/shoppe-default/woocommerce-placeholder_yuatle.png'
    },
    slug: {
      type: String,
      require: true,
      unique: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
    }
  },
  {
    timestamps: true
  }
)

categorySchema.set('toJSON', {
  versionKey: false
})

categorySchema.pre('validate', function (next) {
  if (this.name) {
    this.slug = slugify(this.name, {
      strict: true,
      locale: 'vi'
    })
  }
  next()
})

mongoosePaginate.paginate.options = {
  customLabels
}

categorySchema.plugin(mongoosePaginate)

const CategoryModel = mongoose.model('Category', categorySchema)

export default CategoryModel
