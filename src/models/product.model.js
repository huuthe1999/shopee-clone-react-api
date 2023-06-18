import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import slugify from 'slugify'

import { customLabels } from '../utils/pagination.util.js'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    images: [
      {
        uid: String,
        url: String,
        name: String,
        _id: false
      }
    ],
    categorySlug: {
      type: String,
      required: true
    },
    categoryId: {
      type: String,
      required: true
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    province: {
      _id: String,
      name: String
    },
    shipping: {
      type: [Number],
      default: [2],
      enum: [0, 1, 2] //Express, Fast, Saving
    },
    shopType: {
      type: Number,
      default: 0,
      enum: [0, 1, 2] //Default, Mall, Fav
    },
    status: {
      type: Number,
      default: 0,
      enum: [0, 1] //New, Used
    },
    isActive: {
      type: Boolean,
      default: true
    },
    description: {
      type: String
    },
    vouchers: {
      type: [
        {
          type: { type: Number, required: true, enum: [0, 1] }, // 0:Giảm giá % - 1:Giảm x
          discount: {
            type: {
              percent: {
                type: Number
              },
              price: {
                type: Number
              }
            },
            required: true,
            _id: false
          }
        }
      ]
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      required: true
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
      required: true,
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

  if (this.images) {
    this.image = this.images[0]
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
