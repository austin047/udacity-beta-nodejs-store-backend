import express from "express";
import { validateRequestParams, ParamValidation } from "../middleware/param-validator";
import { validateToken } from "../middleware/token_validator";
import orderModel from "../handlers/order";



const orderRouter = express.Router();

orderRouter.route('/')
    /** GET /api/users - Get user*/
    .get(validateToken, orderModel.index)

orderRouter.route('/:orderId')
    /** GET /api/orders/users/userId - Get user*/
    .get(validateToken,validateRequestParams(ParamValidation.retieveOrder), orderModel.show)

    /** GET /api/orders/users/userId - Get user*/
    .put(validateToken,validateRequestParams(ParamValidation.updateOrder), orderModel.update)

    /** GET /api/orders/users/:userId */
    .delete(validateToken, validateRequestParams(ParamValidation.retieveOrder), orderModel.delete)

orderRouter.route('/users/:userId')
    /** GET /api/orders/users - Get user*/
    .get(validateToken, validateRequestParams(ParamValidation.retieveUserOrders), orderModel.getUserOrder)

      /** POST /api/orders/users - Create new user */
    .post(validateToken, validateRequestParams(ParamValidation.createOrder),  orderModel.create)

orderRouter.route('/:orderId/product')
    /** GET /api/orders/users/userId - Get user*/
    .post(validateToken,validateRequestParams(ParamValidation.addProductToOrder),  orderModel.addProductToOrder) 

    /** GET /api/orders/users/userId - Get product*/
    .get(validateToken,validateRequestParams(ParamValidation.getOrderProducts), orderModel.getOrderProducts) 

    

export default orderRouter; 