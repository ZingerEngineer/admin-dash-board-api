import express , { Router } from 'express'
import { user } from '../models/user'
export const userRouter = express.Router() 
userRouter.get('/', async (req, res, next) => {
  try {
    const users = await user.find()
    res.json(users)
  } catch (error) {
    res.json(error)
    console.log(error)
  }
  
})
userRouter.post('/create', async (req, res, next) => {
  try {
    const newUser = await user.create(req.body)
    res.json(newUser)
  } catch (error) {
    res.json(error)
    console.log(error)
  }
})