import pool from "../database/databaseConnection";
import { productQueries } from "../database/queries/products.queries";
import bcrypt from "bcryptjs";
import APIError from "../helpers/APIError";
import { StatusCodes } from "http-status-codes";
import { orderQueries } from "../database/queries/orders.queries";
import { Product } from "./product.model";

export type Order = {
    id: number,
    userId: number,
    status: string,
};

export type OrderProduct = {
    id?: number,
    orderId: number,
    productId: number,
    productQty: number
};

export class OrderStore {
    async index(): Promise<Order[]> {
        var client = await pool.connect()
        
        const { rows } = await client.query(orderQueries.getAllorders)

        const orders = rows.map((row) => {
            return {
                id : row.id,
                userId: row.user_id,
                status: row.status,
            } 
        })

        client.release()

        return orders
    }


    async show(orderId: number): Promise<Order | null> {
        var client = await pool.connect()

        const { rows } = await client.query(orderQueries.getOrderById, [orderId])  

        if( rows.length <= 0) return null

        client.release()

        return  {
            id : rows[0].id,
            userId: rows[0].user_id,
            status: rows[0].status,
        } 
    }

    async orderByUser(userId: string): Promise<Order[]> {
        var client = await pool.connect()

        const { rows } = await client.query(orderQueries.getOrderByUser, [userId])  

        client.release()

        return rows.map((row) => {
            return {
                id : row.id,
                userId: row.user_id,
                status: row.status,
            } 
        });

    }

    async orderUserByStatus(userId: number, status: string): Promise<Order[]> {
        var client = await pool.connect()

        const { rows } = await client.query(orderQueries.getOrderByUserStatus, [userId, status])  

        client.release()

        return rows.map((row) => {
            return {
                id : row.id,
                userId: row.user_id,
                status: row.status,
            } 
        });

    }

    async productsForOrder(orderId: Number): Promise<Product[]> {
        var client = await pool.connect()

        const { rows } = await client.query(orderQueries.productsForOrder, [orderId])  

        client.release()

        const products = rows.map((row) => {
            return {
                id : row.id,
                name: row.name,
                price: Number(row.price),
                categoryId: row.category_id
            } 
        })

        return products

    }

    async create(order: Order): Promise<Order> {
        const client = await pool.connect()

        const orderPayload = [
            order.userId,
            order.status
        ]

        const { rows } = await client.query(orderQueries.createOrder, orderPayload)

        if(rows.length <= 0 ) throw new  Error("InternalError: Order Account Not Created After ALl conditions passed")

        client.release()

        return  {
            id : rows[0].id,
            userId: rows[0].user_id,
            status: rows[0].status,
        } 
    }

    async createOrderProduct(orderId: Number, productId: Number, productQty: Number): Promise<OrderProduct> {
        const client = await pool.connect()

        const { rows } = await client.query(orderQueries.createOrderProduct, [orderId, productId, productQty])

        if(rows.length <= 0 ) throw new  Error("InternalError: Order Account Not Created After ALl conditions passed")

        client.release()

        return  {
            id : rows[0].id,
            orderId: rows[0].order_id,
            productId: rows[0].product_id,
            productQty: rows[0].product_qty
        } 
    }


    async update(status: string, orderId: Number): Promise<Order> {
        const client = await pool.connect()

        const { rows } = await client.query(orderQueries.updateOrder, [status, orderId])

        if(rows.length <= 0 ) throw new  Error("InternalError: Order Account Not Created After ALl conditions passed")

        client.release()

        return  {
            id : rows[0].id,
            userId: rows[0].user_id,
            status: rows[0].status,
        } 
    }


    async delete(orderId: string): Promise<null> {
        var client = await pool.connect()

        await client.query(orderQueries.deleteOrder, [orderId])

        client.release()
        return null;
    }
}