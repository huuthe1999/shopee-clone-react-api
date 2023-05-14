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
    images: [
      {
        uid: String,
        url: String,
        name: String
      }
    ],
    slug: {
      type: String,
      require: true,
      unique: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
    },
    subCategories: {
      type: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
          },
          name: {
            type: String,
            required: true
          }
        }
      ],
      default: [
        {
          _id: new mongoose.Types.ObjectId(),
          name: 'Mặc định'
        }
      ]
    }
  },
  {
    timestamps: true
  }
)

categorySchema.set('toJSON', {
  versionKey: false
})

categorySchema.pre('save', function (next) {
  if (this.name) {
    this.slug = slugify(this.name, {
      strict: true,
      locale: 'vi'
    })
  }
  next()
})

categorySchema.pre(/(update|Update)/, function (next) {
  // Auto update slug in methods update
  const name = this?.getUpdate()?.name
  if (name) {
    this.getUpdate().slug = slugify(name, {
      strict: true,
      locale: 'vi'
    })
    return next()
  }
})
mongoosePaginate.paginate.options = {
  customLabels
}

categorySchema.plugin(mongoosePaginate)

const CategoryModel = mongoose.model('Category', categorySchema)

export default CategoryModel
