import express from "express";
import userModel from '../models/user.model'
import { validateRequestParams, ParamValidation } from "../middleware/param-validator";
import { validateToken } from "../middleware/token_validator";



const userRouter = express.Router();

userRouter.route('/')
    /** GET /api/users - Get user*/
    .get(validateToken, userModel.list)
    /** POST /api/users - Create new user */
    .post(validateRequestParams(ParamValidation.createUser), userModel.create)

userRouter.route('/:userId')
    /** GET /api/users/userId - Get user*/
    .get(validateToken, userModel.get)


   

export default userRouter; 

