import pool from "../database/databaseConnection";
import { Request, Response, NextFunction } from 'express';
import {
    StatusCodes,
} from 'http-status-codes';
import { categoryQueries } from "../database/queries/categories.queries";


class CategoryModel {

    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Create a category and return the new category object
     * @return {json} Returns json [Category] object 
     */
    static async create(req: Request, res: Response, next: NextFunction) {
        var client = await pool.connect()
        try {
            
            const category = [
                req.body.name
            ];

            const { rows } = await client.query(categoryQueries.createCategory, category);

            if(rows.length <= 0 ) 
                return next(new Error("InternalError: Category failed to create"))

            const newCategory = {
                id: rows[0].id,
                name: rows[0].name,
            };

            return res.status(StatusCodes.CREATED).json(newCategory)

        } catch(e) {
            next(e)
        }
         finally {
            client.release()
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
    static async get(req: Request, res: Response, next: NextFunction) {
        var client = await pool.connect()
        try {

            const { categoryId } = req.params;

            const { rows } = await client.query(categoryQueries.getCategoryById, [categoryId])  

            if(rows.length <= 0 ) return res.status(StatusCodes.NOT_FOUND).json({})

            const category  =   {
                id: rows[0].id,
                name: rows[0].name
            } 


           res.status(StatusCodes.OK).json(category)
        } catch(e) {
            next(e)
        }
         finally {
            client.release()
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
    static async list(req: Request, res: Response, next: NextFunction) {
        var client = await pool.connect()
        try {

            const { rows } = await client.query(categoryQueries.getAllCategories)

            const categoryList = rows.map((row) => {
                return {
                    id : row.id,
                    name: row.name
                } 
            })

            res.status(StatusCodes.OK).json(categoryList)

        } catch(e) {
            next(e)
        }
         finally {
            client.release()
        }
    }
}

export default  CategoryModel;