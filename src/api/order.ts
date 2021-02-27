import express from "express";
import { validateRequestParams, ParamValidation } from "../middleware/param-validator";
import { validateToken } from "../middleware/token_validator";
import orderModel from "../models/order.model";



const orderRouter = express.Router();

orderRouter.route('/')
    /** GET /api/users - Get user*/
    .get(validateToken, orderModel.list)
    /** POST /api/users - Create new user */

orderRouter.route('/:orderId')
    /** GET /api/users/userId - Get user*/
    .get(validateToken, orderModel.get)

orderRouter.route('/users/:userId')
    /** GET /api/users - Get user*/
    .post(validateToken, validateRequestParams(ParamValidation.createOrder), orderModel.create)

    /** GET /api/users/:userId */
    .get(validateToken, validateRequestParams(ParamValidation.retieveUserOrders), orderModel.getUserOrder)


    

export default orderRouter; 