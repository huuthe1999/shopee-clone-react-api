import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import slugify from 'slugify'

import { SHIPPINGS, SHOP_TYPES, STATUS } from '../constants/index.js'
import { customLabels } from '../utils/pagination.util.js'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    images: [
      {
        uid: String,
        url: String,
        name: String
      }
    ],
    categorySlug: {
      type: String,
      require: true
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      require: true
    },
    province: {
      idProvince: String,
      name: String
    },
    shipping: {
      type: [String],
      default: [SHIPPINGS[2]],
      enum: Object.values(SHIPPINGS)
    },
    shopType: {
      type: [String],
      enum: Object.values(SHOP_TYPES)
    },
    status: {
      type: String,
      default: STATUS[0],
      enum: Object.values(STATUS)
    },
    isActive: {
      type: Boolean,
      default: true
    },
    description: {
      type: String
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
