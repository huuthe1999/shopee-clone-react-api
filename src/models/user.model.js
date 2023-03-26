import mongoose from 'mongoose'
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true,
      select: false
    },
    name: {
      type: String,
      default: 'User'
    },
    date_of_birth: {
      type: Date,
      default: null
    },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    roles: {
      type: [String],
      default: ['User'],
      enum: ['User', 'Admin']
    }
  },
  {
    timestamps: true,
    virtuals: true,
    toObject: {
      useProjection: true
    },
    toJSON: { useProjection: true }
  }
)

const UserModel = mongoose.model('User', userSchema)
export default UserModel
