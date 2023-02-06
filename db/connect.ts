import mongoose from 'mongoose'

export const connect = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect('mongodb://127.0.0.1/dashboard-db')
    console.log('Connected to db')
  } catch (error) {
    console.log('Error happened', error)
  }
}
