import pool from "../database/databaseConnection";
import { Request, Response, NextFunction } from 'express';
import {
    StatusCodes,
} from 'http-status-codes';
import { productQueries } from "../database/queries/products.queries";

class ProductModel {
    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Create a product and return the new product object
     * @return {json} Returns json [Product] object 
     */
    static async create(req: Request, res: Response, next: NextFunction) {
        var client = await pool.connect()
        try {
            
            const product = [
                req.body.name,
                req.body.price,
                req.body.categoryId
            ];

            const { rows } = await client.query(productQueries.createProduct, product);

            if(rows.length <= 0 ) 
                return next(new Error("InternalError: product failed to create"))

            const newproduct = {
                id : rows[0].id,
                name: rows[0].name,
                price: rows[0].price,
                categoryId: rows[0].category_id
            };

            return res.status(StatusCodes.CREATED).json(newproduct)

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
     * @description - Get product by productId
     * @return {json} Returns json  [product] object 
     */
    static async get(req: Request, res: Response, next: NextFunction) {
        var client = await pool.connect()
        try {

            const { productId } = req.params;

            const { rows } = await client.query(productQueries.getProductById, [productId])  

            if(rows.length <= 0 ) return res.status(StatusCodes.NOT_FOUND).json({})

            const product  =   {
                id : rows[0].id,
                name: rows[0].name,
                price: rows[0].price,
                categoryId: rows[0].category_id
            } 


           res.status(StatusCodes.OK).json(product)
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
     * @return {json} Returns json [List<product>] object 
     */
    static async list(req: Request, res: Response, next: NextFunction) {
        var client = await pool.connect()
        try {

            const { rows } = await client.query(productQueries.getAllProducts)

            const productList = rows.map((row) => {
                return {
                    id : row.id,
                    name: row.name,
                    price: row.price,
                    categoryId: row.category_id

                } 
            })

            res.status(StatusCodes.OK).json(productList)

        } catch(e) {
            next(e)
        }
         finally {
            client.release()
        }
    }
}

export default ProductModel