import { Request, Response, Express } from 'express'
import { Board, Led } from 'johnny-five'
import express from 'express'
const app = express()
const board = new Board();
const port = 3000
const LED_PIN = 12
const PORT = 3001

const initBoardForLedForPin = (pin: number): Promise<Led> => {
  return new Promise((resolve, reject) => {
    board.on("ready", () => {
      const led = new Led(pin);
      board.repl.inject({
        led
      });

      resolve(led)
    });

    board.on('error', (err) => {
      reject(err)
    })
  })
}

const main = async (app: Express) => {
  app.use(express.static('public'))
  const led = await initBoardForLedForPin(LED_PIN)

  app.get('/on', async (_: Request, res: Response) => {
    console.log('Lamb should turn on')
    led.on();
    res.status(200).json({
      message: 'Lamb on'
    })
  })
  
  app.get('/off', (_: Request, res: Response) => {
    console.log('Lamb should turn off')
    led.off();
    res.status(200).json({
      message: 'Lamb off'
    })
  })
} 

app.listen(PORT, () => {
  console.log(`Lamb app listening on port ${PORT}`)
  main(app)
})