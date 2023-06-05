import mongoose from 'mongoose'

const provinceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
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
