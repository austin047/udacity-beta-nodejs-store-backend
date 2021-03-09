import pool from "../database/databaseConnection";
import { Request, Response, NextFunction } from 'express';
import {
    StatusCodes,
} from 'http-status-codes';
import { categoryQueries } from "../database/queries/categories.queries";
import { CategoryStore, Category } from "../models/category.model";

const categoryStore = new CategoryStore()


class CategoryHandler {

    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Create a category and return the new category object
     * @return {json} Returns json [Category] object 
     */
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            
            // @ts-ignore
            const categoryPayload : Category = {
                name: req.body.name
            }

            const category = await categoryStore.create(categoryPayload)

            return res.status(StatusCodes.CREATED).json(category)

        } catch(e) {
            next(e)
        }
    }



    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Get category by categoryId
     * @return {json} Returns json  [Category] object 
     */
    static async show(req: Request, res: Response, next: NextFunction) {
        try {

            const { categoryId } = req.params;

            const category = await categoryStore.show(Number(categoryId))

            if(!category) return res.status(StatusCodes.NOT_FOUND).json({})

           res.status(StatusCodes.OK).json(category)
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
     * @return {json} Returns json [List<Category>] object 
     */
    static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryList = await categoryStore.index()
            res.status(StatusCodes.OK).json(categoryList)

        } catch(e) {
            next(e)
        }
    }

     /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Delete Category
     * @return {json} Returns json [List<Order>] object 
     */
    static async delete (req: Request, res: Response, next: NextFunction) {
        try {

            const { categoryId } = req.params

            await categoryStore.delete(Number(categoryId))

            res.status(StatusCodes.OK).json({})
            
        } catch(e) {
            next(e)
        }
    }
}

export default  CategoryHandler;