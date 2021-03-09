import express from "express";
import userModel from '../handlers/user'
import { validateRequestParams, ParamValidation } from "../middleware/param-validator";
import { validateToken } from "../middleware/token_validator";



const userRouter = express.Router();

userRouter.route('/')
    /** GET /api/users - Get user*/
    .get(validateToken, userModel.index)
    /** POST /api/users - Create new user */
    .post(validateRequestParams(ParamValidation.createUser), userModel.create)

userRouter.route('/login')
    /** GET /api/users - Get user*/
    .post(userModel.authenticate)

userRouter.route('/:userId')
    /** GET /api/users/userId - Get user*/
    .get(validateToken, validateRequestParams(ParamValidation.retieveUser), userModel.show)

    .delete(userModel.delete)


   

export default userRouter; 

