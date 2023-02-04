import mongoose from 'mongoose'

export const connect = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect('mongodb://localhost/dashboard-db-1')
    console.log('Connected to db')
  } catch (error) {
    console.log('Error happened', error)
  }
}
