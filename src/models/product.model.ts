import pool from "../database/databaseConnection";
import { productQueries } from "../database/queries/products.queries";
import bcrypt from "bcryptjs";
import APIError from "../helpers/APIError";
import { StatusCodes } from "http-status-codes";

export type Product = {
    id: number,
    name: string,
    price: number,
    categoryId: number
};

export class ProductStore {
    async index(): Promise<Product[]> {
        var client = await pool.connect()
        
        const { rows } = await client.query(productQueries.getAllProducts)

        const products = rows.map((row) => {
            return {
                id : row.id,
                name: row.name,
                price: Number(row.price),
                categoryId: row.category_id
            } 
        })

        client.release()

        return products 
    }


    async show(productId: Number): Promise<Product | null> {
        var client = await pool.connect()

        const { rows } = await client.query(productQueries.getProductById, [productId])  

        if( rows.length <= 0) return null

        client.release()

        return  {
            id : rows[0].id,
            name: rows[0].name,
            price: Number(rows[0].price),
            categoryId: rows[0].category_id
        } 
    }

    async create(product: Product): Promise<Product> {
        var client = await pool.connect()

        const productPayload = [
            product.name,
            product.price,
            product.categoryId
        ]

        const { rows } = await client.query(productQueries.createProduct, productPayload )

        if(rows.length <= 0 ) throw new  Error("InternalError: Product Account Not Created After ALl conditions passed")

        client.release()

        return  {
            id : rows[0].id,
            name: rows[0].name,
            price: Number(rows[0].price),
            categoryId: rows[0].category_id
        } 
    }


    async delete(productId: Number): Promise<null> {
        var client = await pool.connect()

        await client.query(productQueries.deleteProduct, [productId])

        client.release()
        return null;
    }
}