import { Request, Response, Express } from 'express'
import express from 'express'
import { connect } from './db/connect'
import bodyParser from 'body-parser'
import { userRouter } from './routes/user.route'
const app = express()
const PORT = 3001

const main = async (app: Express) => {
  app.use(express.static('public'))
  app.use(bodyParser.json)
  app.use('/api',userRouter)
}
app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`)
  await connect()
  main(app)
})