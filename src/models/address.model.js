import mongoose from 'mongoose'

import { districtSchema } from './district.model.js'
import { provinceSchema } from './province.model.js'
import { wardSchema } from './ward.model.js'

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    isDefault: {
      type: Boolean,
      default: false
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    province: {
      type: provinceSchema,
      required: true
    },
    district: {
      type: districtSchema,
      required: true
    },
    ward: {
      type: wardSchema,
      required: true
    }
  },
  {
    timestamps: true
  }
)

addressSchema.set('toJSON', {
  versionKey: false
})

const AddressModel = mongoose.model('Address', addressSchema)

export default AddressModel
