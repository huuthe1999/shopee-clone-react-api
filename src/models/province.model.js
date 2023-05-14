import mongoose from 'mongoose'

const provinceSchema = new mongoose.Schema(
  {
    idProvince: {
      type: String,
      require: true,
      unique: true
    },
    name: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
)

provinceSchema.set('toJSON', {
  versionKey: false
})

const ProvinceModel = mongoose.model('Province', provinceSchema)

export default ProvinceModel
