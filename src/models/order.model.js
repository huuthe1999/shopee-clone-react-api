import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import { STATUS_ORDER } from '../constants/index.js'
import { customLabels } from '../utils/pagination.util.js'

const orderSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      require: true
    },
    status: {
      type: Number,
      default: -1,
      enum: STATUS_ORDER
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      require: true
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: true
    }
  },
  {
    timestamps: true
  }
)

orderSchema.set('toJSON', {
  versionKey: false
})

mongoosePaginate.paginate.options = {
  customLabels
}

orderSchema.plugin(mongoosePaginate)

const OrderModel = mongoose.model('Order', orderSchema)

export default OrderModel
