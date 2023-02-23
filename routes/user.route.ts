import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { User } from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const saltRounds = 10
export const userRouter = express.Router()

userRouter.post('/login', async (req, res, next) => {
  try {
    const { email: signInEmail } = req.body
    const requestedDbEmail = await User.findOne({ email: signInEmail })
    if (requestedDbEmail === null) {
      res.status(400).json({ message: 'Invalid email or password.' })
      return
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      requestedDbEmail.password
    )
    if (!isValidPassword) {
      res.status(400).json({ message: 'Invalid email or password.' })
      return
    }
    if (!process.env.ACCESS_TOKEN_SECRET) {
      res.status(500).json({ message: 'Error happened.' })
      return
    }
    const token = jwt.sign(
      { requestedDbEmail },
      process.env.ACCESS_TOKEN_SECRET
    )
    User.updateOne({ email: requestedDbEmail.email }, { token })
    res.status(200).json('Welcome back !')
  } catch (error) {
    res.json({ message: 'Error happened.' })
  }
  next()
})

userRouter.post('/signup', async (req, res, next) => {
  // Take the credentials from the post request.
  // Encrypt the password.
  // Generate access token.
  // Save & update new user.
  // Redirect to logged in authorized routes.

  try {
    const { email: newUserEmail, password: newUserPassword } = req.body
    const isDuplicate = await User.find({ email: newUserEmail })
    if (isDuplicate.length != 0) {
      res.status(400).json('Email is already in use.')
      return
    }
    const newHashedUserPassword = await bcrypt.hash(newUserPassword, saltRounds)
    const newUser = await User.create({
      email: newUserEmail,
      password: newHashedUserPassword
    })
    if (process.env.ACCESS_TOKEN_SECRET === undefined) {
      res.status(500).json({ message: 'Error happened.' })
      return
    }
    const token = jwt.sign({ newUser }, process.env.ACCESS_TOKEN_SECRET)
    await User.findOneAndUpdate({ email: newUser.email }, { token })
  } catch (error) {
    console.log(error)
    res.json('Error happened.')
  }
})
