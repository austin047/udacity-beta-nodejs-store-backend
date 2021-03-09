import pool from "../database/databaseConnection";
import { Request, Response, NextFunction } from 'express';
import {
    StatusCodes,
} from 'http-status-codes';
import { orderQueries } from "../database/queries/orders.queries";
import { Order, OrderStore } from "../models/order.model";


const orderStore = new OrderStore()

class OrderHandler {
    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Create a order and return the new order object
     * @return {json} Returns json [order] object 
     */
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;

            // @ts-ignore
            const order: Order = {
                userId: Number(userId),
                status: "pending"
            }

            const newOrder = await orderStore.create(order)

            if(!newOrder) return next(new Error("InternalError: order failed to create"))

            return res.status(StatusCodes.CREATED).json(newOrder)

        } catch(e) {
            next(e)
        }
    }


    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Add product to order
     * @return {json} Returns json [order] object 
     */
    static async addProductToOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const { orderId } = req.params;

            const { productId, productQty} = req.body
            
            const newOrderProduct = await orderStore.createOrderProduct(Number(orderId), productId, productQty)

            if(!newOrderProduct) return next(new Error("InternalError: order failed to create"))

            return res.status(StatusCodes.CREATED).json(newOrderProduct)

        } catch(e) {
            next(e)
        }
    }




    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Get order by orderId
     * @return {json} Returns json  [order] object 
     */
    static async show(req: Request, res: Response, next: NextFunction) {
        try {

            const { orderId } = req.params;

            const order = await orderStore.show(Number(orderId))

            if(!order) return res.status(StatusCodes.NOT_FOUND).json({})

           res.status(StatusCodes.OK).json(order)
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
     * @return {json} Returns json [List<order>] object 
     */
    static async index(req: Request, res: Response, next: NextFunction) {
        try {

            const orders = await orderStore.index()
            res.status(StatusCodes.OK).json(orders)

        } catch(e) {
            next(e)
        }
    }


     /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Get all complete orders for users
     * @return {json} Returns json [List<Order>] object 
     */
    static async getUserOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const { status } = req.query;

            if(status) {
                const orders = await orderStore.orderUserByStatus(Number(userId), status as string)

                return res.status(StatusCodes.OK).json(orders)
            } else {
                const orders = await orderStore.orderByUser(userId)

                return res.status(StatusCodes.OK).json(orders)
            }

        } catch(e) {
            next(e)
        } 
    }

      /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Get all products for order
     * @return {json} Returns json [List<Order>] object 
     */
    static async getOrderProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const { orderId } = req.params;

            const products = await orderStore.productsForOrder(Number(orderId))

            return res.status(StatusCodes.OK).json(products)

        } catch(e) {
            next(e)
        } 
    }


     /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Delete Order
     * @return {json} Returns json [List<Order>] object 
     */
    static async update (req: Request, res: Response, next: NextFunction) {
        try {
            const { orderId } = req.params
            const { status } = req.query;

            const order = await orderStore.update(status as string, Number(orderId))

            res.status(StatusCodes.OK).json(order)
            
        } catch(e) {
            next(e)
        }
    }


     /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Delete Order
     * @return {json} Returns json [List<Order>] object 
     */
    static async delete (req: Request, res: Response, next: NextFunction) {
        try {
            const { orderId } = req.params

            await orderStore.delete(orderId)

            res.status(StatusCodes.OK).json({})
            
        } catch(e) {
            next(e)
        }
    }


}

export default OrderHandler