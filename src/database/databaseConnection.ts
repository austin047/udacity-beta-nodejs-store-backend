import { Pool } from "pg";
import { config  } from 'dotenv'
//Intialize environmental variables
config()

let poolConfig 

if(process.env.NODE_ENV === "prod") {
    poolConfig  = {
        "user":  process.env.PRODUCTION_POSTGRES_USERNAME ,
        "password": process.env.PRODUCTION_POSTGRES_PASSWORD,
        "database": process.env.PRODUCTION_POSTGRES_DB,
        "host": "localhost",
        "port": 5432
    }
} else if(process.env.NODE_ENV === "test") {
    poolConfig  = {
        "user":  process.env.TEST_POSTGRES_USERNAME ,
        "password": process.env.TEST_POSTGRES_PASSWORD,
        "database": process.env.TEST_POSTGRES_DB,
        "host": "localhost",
        "port": 5432
    }
} else {
    poolConfig  = {
        "user":  process.env.DEVELOPMENT_POSTGRES_USERNAME ,
        "password": process.env.DEVELOPMENT_POSTGRES_PASSWORD,
        "database": process.env.DEVELOPMENT_POSTGRES_DB,
        "host": "localhost",
        "port": 5432,
    }
}

const pool = new Pool(poolConfig)

pool.on("connect", () => {
    console.log(`${process.env.NODE_ENV} environment: db connection established`);
});

pool.on("error", (error, client) => {
    console.log(`${process.env.NODE_ENV} environment: error occured while establishing connection to database`);
    console.log(error)
});


export default pool;
