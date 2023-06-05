import mongoose from 'mongoose'

const wardSchema = new mongoose.Schema(
  {
    districtId: {
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

wardSchema.set('toJSON', {
  versionKey: false
})

const WardModel = mongoose.model('Ward', wardSchema)

export default WardModel
