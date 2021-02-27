import pool from "../database/databaseConnection";
import { Request, Response, NextFunction } from 'express';
import {
    StatusCodes,
} from 'http-status-codes';
import { orderQueries } from "../database/queries/orders.queries";

class OrderModel {
    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Create a order and return the new order object
     * @return {json} Returns json [order] object 
     */
    static async create(req: Request, res: Response, next: NextFunction) {
        var client = await pool.connect()
        try {
            const { userId } = req.params;

            const orderPayload = [
                userId,
                req.body.status,
            ];

            const { rows } = await client.query(orderQueries.createOrder, orderPayload);

            if(rows.length <= 0 ) 
                return next(new Error("InternalError: order failed to create"))

            const orderProductPayload = [
                userId,
                rows[0].id,
                req.body.productId,
                req.body.productQty,
            ]

            const  { rows: orderProductRows } = await client.query(orderQueries.createOrderProduct, orderProductPayload);

            const orderProducts = {
                userId: orderProductRows[0].user_id,
                orderId: orderProductRows[0].order_id,
                productId: orderProductRows[0].product_id,
                productQty: orderProductRows[0].product_qty,
            };

            return res.status(StatusCodes.CREATED).json(orderProducts)

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
     * @description - Get order by orderId
     * @return {json} Returns json  [order] object 
     */
    static async get(req: Request, res: Response, next: NextFunction) {
        var client = await pool.connect()
        try {

            const { orderId } = req.params;

            const { rows } = await client.query(orderQueries.getOrderById, [orderId])  

            if(rows.length <= 0 ) return res.status(StatusCodes.NOT_FOUND).json({})

            const order  =   {
                id : rows[0].id,
                userId: rows[0].user_id,
            } 


           res.status(StatusCodes.OK).json(order)
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
     * @return {json} Returns json [List<order>] object 
     */
    static async list(req: Request, res: Response, next: NextFunction) {
        var client = await pool.connect()
        try {

            const { rows } = await client.query(orderQueries.getAllorders)

            const orderList = rows.map((row) => {
                return {
                    id : row.id,
                    name: row.name,
                    price: row.price,
                    categoryId: row.category_id

                } 
            })

            res.status(StatusCodes.OK).json(orderList)

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
     * @description - Get all complete orders for users
     * @return {json} Returns json [List<Order>] object 
     */
    static async getUserOrder(req: Request, res: Response, next: NextFunction) {
        var client = await pool.connect()
        try {

            const { userId } = req.params;
            const { status } = req.query;

            const { rows } = await client.query(orderQueries.getOrderByUser, [userId, status])

            const orderList = rows.map((row) => {
                return {
                    id : row.id,
                    userId: row.user_id,
                    status: row.status
                } 
            })

            res.status(StatusCodes.OK).json(orderList)

        } catch(e) {
            next(e)
        }
         finally {
            client.release()
        }
    }
}

export default OrderModel