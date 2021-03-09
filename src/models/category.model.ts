import pool from "../database/databaseConnection";
import { userQueries } from "../database/queries/users.queries";
import bcrypt from "bcryptjs";
import APIError from "../helpers/APIError";
import { StatusCodes } from "http-status-codes";
import { categoryQueries } from "../database/queries/categories.queries";

export type Category = {
    id: number,
    name: string,
}

export class CategoryStore {
    async index(): Promise<Category[]> {
        var client = await pool.connect()
        
        const { rows } = await client.query(categoryQueries.getAllCategories)

        const userList = rows.map((row) => {
            return {
                id : row.id,
                name: row.name
            }
        })

        client.release()


        return userList
    }


    async show(id: number): Promise<Category | null> {
        var client = await pool.connect()

        const { rows } = await client.query(categoryQueries.getCategoryById, [id])      

        if( rows.length <= 0) return null

        client.release()

        return   {
            id: rows[0].id,
            name: rows[0].name
        } 
    }

    async create(category: Category): Promise<Category> {
        var client = await pool.connect()

        const userPayload = [
            category.name
        ]

        const { rows } = await client.query(categoryQueries.createCategory, userPayload)

        if(rows.length <= 0 ) throw new  Error("InternalError: Categories Account Not Created After ALl conditions passed")

        client.release()

        return  {
            id: rows[0].id,
            name: rows[0].name
        } 

    }


    async delete(id: Number): Promise<null> {
        var client = await pool.connect()

        await client.query(categoryQueries.deleteCategory, [id])

        client.release()

        return null;
    }
}