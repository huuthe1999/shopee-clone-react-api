import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import slugify from 'slugify'

import { customLabels } from '../utils/pagination.util.js'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    images: {
      type: [String],
      default: [
        'https://res.cloudinary.com/dknvhah81/image/upload/v1683429549/shoppe-default/20210604_RGFkOmxRF6Emt7SXpoGBDyZO_o1vv86.png'
      ]
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      require: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    price: {
      type: Number,
      require: true
    },
    quantity: {
      type: Number,
      require: true
    },
    rating: {
      type: Number,
      require: true
    },
    discount: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    viewed: {
      type: Number,
      default: 0
    },
    slug: {
      type: String,
      require: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
)

productSchema.set('toJSON', {
  versionKey: false
})

productSchema.pre('save', function (next) {
  if (this.name) {
    this.slug = slugify(this.name, {
      strict: true,
      locale: 'vi'
    })
  }

  if (!this.discount) {
    this.discount = Math.floor(Math.random() * 50)
  }

  next()
})

mongoosePaginate.paginate.options = {
  customLabels
}

productSchema.plugin(mongoosePaginate)

const ProductModel = mongoose.model('Product', productSchema)

export default ProductModel
