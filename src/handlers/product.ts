import pool from "../database/databaseConnection";
import { Request, Response, NextFunction } from 'express';
import {
    StatusCodes,
} from 'http-status-codes';
import { productQueries } from "../database/queries/products.queries";
import { ProductStore, Product } from "../models/product.model";


const productStore = new ProductStore()

class ProductHandler {
    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Create a product and return the new product object
     * @return {json} Returns json [Product] object 
     */
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            
            // @ts-ignore
            const product : Product = {
                name: req.body.name,
                price: req.body.price,
                categoryId: req.body.categoryId
            };

            const newProduct = await productStore.create(product)

            if(!newProduct) return next(new Error("InternalError: product failed to create"))

            return res.status(StatusCodes.CREATED).json(newProduct)

        } catch(e) {
            next(e)
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
    static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const { productId } = req.params;

            const product = await productStore.show(Number(productId))

            if(!product) return res.status(StatusCodes.NOT_FOUND).json({})

           res.status(StatusCodes.OK).json(product)
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
     * @return {json} Returns json [List<product>] object 
     */
    static async index(req: Request, res: Response, next: NextFunction) {
       try {
            const productList = await productStore.index()

            res.status(StatusCodes.OK).json(productList)

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

            const { productId } = req.params

            await productStore.delete(Number(productId))

            res.status(StatusCodes.OK).json({})
            
        } catch(e) {
            next(e)
        }
    }
}

export default ProductHandler