import express , { Router } from 'express'
import { user } from '../models/user'
export const userRouter = express.Router() 
userRouter.get('/', async (req, res, next) => {
  await user
    .find()
    .then((users) => {
      res.json(users)
    })
    .catch(next)
})
userRouter.post('/create', async (req, res, next) => {
  await user.create(req.body)
    .then((user) => {
      res.send(user)
    })
    .catch(next)
})