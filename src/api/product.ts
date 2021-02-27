import express from "express";
import { validateRequestParams, ParamValidation } from "../middleware/param-validator";
import { validateToken } from "../middleware/token_validator";
import productModel from "../models/product.model";



const productRouter = express.Router();

productRouter.route('/')
    /** GET /api/users - Get user*/
    .get(validateToken, productModel.list)
    /** POST /api/users - Create new user */
    .post(validateToken, validateRequestParams(ParamValidation.createProduct), productModel.create)

productRouter.route('/:productId')
    /** GET /api/users/userId - Get user*/
    .get(validateToken, productModel.get)



export default productRouter; 