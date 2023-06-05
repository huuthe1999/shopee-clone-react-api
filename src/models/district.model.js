import mongoose from 'mongoose'

const districtSchema = new mongoose.Schema(
  {
    provinceId: {
      type: String
    },
    name: {
      type: String,
      require: true
    }
  },
  {
    timestamps: false
  }
)

districtSchema.set('toJSON', {
  versionKey: false
})

const DistrictModel = mongoose.model('District', districtSchema)

export default DistrictModel
