import pool from "../database/databaseConnection";
import bcrypt from "bcryptjs";
import { userQueries } from "../database/queries/users.queries";
import { Request, Response, NextFunction } from 'express';
import { createAuthToken } from "../middleware/token_validator";
import {
    StatusCodes,
} from 'http-status-codes';
import { UserStore, User } from "../models/user.model";


const userStore = new UserStore()


class UserHandler { 

    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Create a user and return the new user object
     * @return {json} Returns json New [User] object 
     */
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
        
            // @ts-ignore
            const user: User = {
                userName: req.body.userName,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password
            }

            const newUser = await userStore.create(user)

            const token = createAuthToken(newUser);

            res.status(StatusCodes.CREATED).send({
                user: newUser,
                token: token
            })

        } catch(e) {
            next(e)
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
    static async show(req: Request, res: Response, next: NextFunction)  {
        try {

            const { userId } = req.params;

            const user = await userStore.show(Number(userId))

            if(!user) return res.status(StatusCodes.NOT_FOUND).json({})

           res.status(StatusCodes.OK).json(user)
        } catch(e) {
            next(e)
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
    static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userStore.index()
            res.status(StatusCodes.OK).json(users)

        } catch(e) {
            next(e)
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
    static async authenticate (req: Request, res: Response, next: NextFunction) {
        try {

            const {userName, password} = req.body

            const user = await userStore.authenticate(userName, password)

            if(!user) return res.status(StatusCodes.NOT_FOUND).json({error: "user not found"})

            res.status(StatusCodes.OK).json(user)

        } catch(e) {
            next(e)
        }
    }


     /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Delete user
     * @return {json} Returns json [List<Order>] object 
     */
    static async delete (req: Request, res: Response, next: NextFunction) {
        try {

            const {userId} = req.params

            await userStore.delete(Number(userId))

            res.status(StatusCodes.OK).json({})
            
        } catch(e) {
            next(e)
        }
    }



}

export default UserHandler