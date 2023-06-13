import mongoose from 'mongoose'

export const provinceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: false
  }
)

provinceSchema.set('toJSON', {
  versionKey: false
})

const ProvinceModel = mongoose.model('Province', provinceSchema)

export default ProvinceModel
