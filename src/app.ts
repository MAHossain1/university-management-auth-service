import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: any) => {
  res.send('Hello World!')
})

app.get('/sonar-bangla', (req: Request, res: Response) => {
  res.send('Hello World chorer bangla')
})

export default app
