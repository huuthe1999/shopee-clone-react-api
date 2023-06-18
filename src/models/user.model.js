import mongoose from 'mongoose'

import { ROLES, SEXES } from '../constants/index.js'

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
    avatar: String,
    avatarId: {
      type: String,
      select: false
    },
    name: {
      type: String,
      default: 'User'
    },
    date_of_birth: {
      type: Date,
      transform: v => v.getTime(),
      set: v => new Date(v),
      default: new Date(1910, 1, 1)
    },
    phone: { type: String, default: '' },
    sex: {
      type: Number,
      set: v => +v,
      default: SEXES.None,
      enum: Object.values(SEXES)
    },
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
    toJSON: {
      useProjection: true,
      versionKey: false
    }
  }
)

const UserModel = mongoose.model('User', userSchema)

export default UserModel
