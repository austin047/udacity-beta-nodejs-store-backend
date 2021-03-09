import express from "express";
import { validateRequestParams, ParamValidation } from "../middleware/param-validator";
import { validateToken } from "../middleware/token_validator";
import productHandler from "../handlers/product";



const productRouter = express.Router();

productRouter.route('/')
    /** GET /api/products - Get user*/
    .get(validateToken, productHandler.index)
    /** POST /api/products - Create new user */
    .post(validateToken, validateRequestParams(ParamValidation.createProduct), productHandler.create)

productRouter.route('/:productId')
    /** GET /api/products/productId - Get user*/
    .get(validateToken, validateRequestParams(ParamValidation.retieveProduct), productHandler.show)

     /** GET /api/products/productId - Get user*/
     .delete(validateToken, validateRequestParams(ParamValidation.retieveProduct), productHandler.delete)

export default productRouter; 