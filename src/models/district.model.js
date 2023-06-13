import mongoose from 'mongoose'

export const districtSchema = new mongoose.Schema(
  {
    provinceId: {
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

districtSchema.set('toJSON', {
  versionKey: false
})

const DistrictModel = mongoose.model('District', districtSchema)

export default DistrictModel
