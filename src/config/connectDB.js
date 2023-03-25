import { connect } from 'mongoose'

const connectDB = async () => {
  try {
    await connect(process.env.DATABASE_URL)
  } catch (err) {
    console.log(err)
  }
}

export default connectDB
