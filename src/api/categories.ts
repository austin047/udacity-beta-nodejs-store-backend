import express from "express";
import { validateRequestParams, ParamValidation } from "../middleware/param-validator";
import { validateToken } from "../middleware/token_validator";
import categoryModel from "../models/category.model";



const categoryRouter = express.Router();

categoryRouter.route('/')
    /** GET /api/users - Get user*/
    .get(categoryModel.list)
    /** POST /api/users - Create new user */
    .post(validateToken, validateRequestParams(ParamValidation.createCategory), categoryModel.create)

    categoryRouter.route('/:categoryId')
    /** GET /api/users/userId - Get user*/
    .get(validateToken, validateRequestParams(ParamValidation.retieveCategory), categoryModel.get)

export default categoryRouter; 
