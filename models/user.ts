import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  role:{
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type:String,
    required: true
  }
})

export const user = mongoose.model("User" , userSchema)