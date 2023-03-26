import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, { autoIndex: false })
  } catch (err) {
    console.log('Connection error: ', err)
  }
}

export default connectDB
