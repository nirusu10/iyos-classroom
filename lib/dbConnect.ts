import mongoose, { Connection } from 'mongoose'

let cached: Connection | null = null

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable')
  }

  if (cached && mongoose.connection.readyState === 1) {
    console.log('Using cached db connection')
    return cached
  }
  try {
    const con = await mongoose.connect(MONGODB_URI)

    cached = con.connection
    console.log('MongoDB connected')
    return cached
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

export const clearCachedConnection = () => {
  cached = null
}

export default connectDB
