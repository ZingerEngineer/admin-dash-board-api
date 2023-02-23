import dotenv from 'dotenv'
dotenv.config()
import { Request, Response, Express } from 'express'
import express from 'express'
import { connect } from './db/connect'
import bodyParser from 'body-parser'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { router } from './routes'
const app = express()
const PORT = 3001

const main = async (app: Express) => {
  app.use(bodyParser.json())
  app.use(cors())
  app.use('/api', router)
}

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`)
  await connect()
  main(app)
})
