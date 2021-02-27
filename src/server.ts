import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { config  } from 'dotenv'
import morgan from 'morgan'
import apiRouter from './api'
import {
  StatusCodes,
  ReasonPhrases
} from 'http-status-codes';
import { configureEnv } from './helpers/utils'



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

// if error is not an instanceOf APIError, convert it.
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     if (!(err instanceof APIError)) {
//         console.log(err)
//         console.log(err.isPublic)
//         console.log(err.status);

//         const apiError = new APIError(err.message, err.status, err.isPublic);
//         // console.log('------------------------\t');
//         // console.log(err.stack);
//         // console.log('------------------------\t');
//         return next(apiError);
//       }
//     return next(err);
//   });

  
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {// eslint-disable-line no-unused-vars
    // console.log(err.stack)
    console.log(err)
    console.log(process.env.NODE_ENV)

    // next(err) err.isPublic ? err.message : httpStatus[err.status],
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.isPublic ? err.message : ReasonPhrases.INTERNAL_SERVER_ERROR,
      stack: (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'dev') ? err.stack  : {}
    })
    
  });

const server = app.listen(3000, function () {
    console.log(`Environment[${process.env.NODE_ENV}] | starting app on: ${address}`)
})

export default server;
