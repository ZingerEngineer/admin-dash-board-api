import { Request, Response, Express } from 'express'
import express from 'express'
import { connect } from './db/connect'
const app = express()
const PORT = 3001

const main = async (app: Express) => {
  app.use(express.static('public'))

  app.get('/on', async (_: Request, res: Response) => {
    res.status(200).json({
    })
  })
  
  app.get('/off', (_: Request, res: Response) => {
    res.status(200).json({
    })
  })
} 

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`)
  await connect()
  main(app)
})