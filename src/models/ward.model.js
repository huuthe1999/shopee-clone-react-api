import mongoose from 'mongoose'

export const wardSchema = new mongoose.Schema(
  {
    districtId: {
      type: String
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: false
  }
)

wardSchema.set('toJSON', {
  versionKey: false
})

const WardModel = mongoose.model('Ward', wardSchema)

export default WardModel
