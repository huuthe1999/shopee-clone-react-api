import mongoose from 'mongoose'

import { ROLES } from '../constants/index.js'
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
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
      enum: Object.values(ROLES)
    }
  },
  {
    timestamps: true,
    virtuals: true,
    toObject: {
      useProjection: true,
      versionKey: false
    },
    toJSON: { useProjection: true, versionKey: false }
  }
)

const UserModel = mongoose.model('User', userSchema)

export default UserModel
