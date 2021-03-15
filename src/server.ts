import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { config  } from 'dotenv'
import morgan from 'morgan'
import apiRouter from './api'
import {
  StatusCodes,
  ReasonPhrases
} from 'http-status-codes';
import APIError from './helpers/APIError'



//Intialize environmental variables
config()

//If in development or test environment and .env file is not found copy .env.example to .env file
// configureEnv()


const app: express.Application = express()

const port = process.env.PORT || 3000

const address: string = `0.0.0.0:${port}`

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('combined'))


// app.get('/', function (req: Request, res: Response) {
//     res.send('Hello World!')
// })
app.use('/api', apiRouter)



  
  app.use((err: APIError, req: Request, res: Response, next: NextFunction) => {// eslint-disable-line no-unused-vars

    let status: number

    //console.log(err)

    if(err.status) status = err.status
    else status = StatusCodes.INTERNAL_SERVER_ERROR

    // next(err) err.isPublic ? err.message : httpStatus[err.status],
    res.status(status).json({
      error: err.isPublic ? err.message : ReasonPhrases.INTERNAL_SERVER_ERROR,
      stack: (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'dev') ? err.stack  : {}
    })
    
  });

const server = app.listen(3000, function () {
    console.log(`Environment[${process.env.NODE_ENV}] | starting app on: ${address}`)
})

export default server;
