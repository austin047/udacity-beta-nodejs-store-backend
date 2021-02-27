import pool from "../database/databaseConnection";
import bcrypt from "bcryptjs";
import { userQueries } from "../database/queries/users.queries";
import { Request, Response, NextFunction } from 'express';
import { createAuthToken } from "../middleware/token_validator";
import {
    StatusCodes,
} from 'http-status-codes';




class UserModel { 

    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Create a user and return the new user object
     * @return {json} Returns json New [User] object 
     */
    static async create(req: Request, res: Response, next: NextFunction) {
        var client = await pool.connect()
        try {
            
            const user = [
                req.body.firstName,
                req.body.lastName,
                bcrypt.hashSync(req.body.password, Number(process.env.SALT)),
            ];

            const { rows } = await client.query(userQueries.createUser, user)

            if(rows.length <= 0 ) 
                return next(new Error("InternalError: User Account Not Created After ALl conditions passed"))
                // this will be passed to the erro middle were which intentds logs this errot processing

            const userResult  =  {
                id: rows[0].id,
                firstName: rows[0].firstname,
                lastName: rows[0].lastname,
            } 

            const token = createAuthToken(userResult);

            res.status(StatusCodes.CREATED).send({
                user: userResult,
                token: token
            })

        } catch(e) {
            next(e)
        }
         finally {
            client.release()
        }
    }

     /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Get user by userId
     * @return {json} Returns json  [Order] object 
     */
    static async get(req: Request, res: Response, next: NextFunction)  {
        var client = await pool.connect()
        try {

            const { userId } = req.params;

            const { rows } = await client.query(userQueries.getUser, [userId])  

            if(rows.length <= 0 ) return res.status(StatusCodes.NOT_FOUND).json({})


            const user  =   {
                id: rows[0].id,
                firstName: rows[0].firstname,
                lastName: rows[0].lastname,
            } 


           res.status(StatusCodes.OK).json(user)
        } catch(e) {
            next(e)
        }
         finally {
            client.release()
        }
    }

    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Get list of all users
     * @return {json} Returns json [List<Order>] object 
     */
    static async list(req: Request, res: Response, next: NextFunction) {
        var client = await pool.connect()
        try {

            const { rows } = await client.query(userQueries.getAllUser)

            const orderList = rows.map((row) => {
                return {
                    id : row.id,
                    userId: row.user_id,
                    status: row.status
                } 
            })

            res.status(StatusCodes.OK).json(orderList)

        } catch(e) {
            next(e)
        }
         finally {
            client.release()
        }
    }


}

export default UserModel