import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongod: MongoMemoryServer

export const connect = async (): Promise<void> => {
  mongod = await MongoMemoryServer.create()
  process.env.MONGODB_URI = mongod.getUri()
  await mongoose.connect(mongod.getUri())
  console.log('Test MongoDB connected')
}

export const closeDB = async (): Promise<void> => {
  if (mongoose.connection.readyState) {
    await mongoose.disconnect()
    await mongod?.stop()
    console.log('Test MongoDB connection closed')
  }
}

export const clearDB = async (): Promise<void> => {
  const collections = mongoose.connection.collections
  Object.values(collections).forEach((collection) => collection.deleteMany({}))
  console.log('Test MongoDB collections cleared')
}
