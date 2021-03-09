import express from "express";
import { validateRequestParams, ParamValidation } from "../middleware/param-validator";
import { validateToken } from "../middleware/token_validator";
import categoryHandler from "../handlers/category";



const categoryRouter = express.Router();

categoryRouter.route('/')
    /** GET /api/users - Get user*/
    .get(categoryHandler.index)
    /** POST /api/users - Create new user */
    .post(validateToken, validateRequestParams(ParamValidation.createCategory), categoryHandler.create)

    categoryRouter.route('/:categoryId')
    /** GET /api/users/userId - Get user*/
    .get(validateToken, validateRequestParams(ParamValidation.retieveCategory), categoryHandler.show)

    /** GET /api/users/userId - Get user*/
    .delete(categoryHandler.delete)

export default categoryRouter; 
