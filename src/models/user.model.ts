import pool from "../database/databaseConnection";
import { userQueries } from "../database/queries/users.queries";
import bcrypt from "bcryptjs";
import APIError from "../helpers/APIError";
import { StatusCodes } from "http-status-codes";

export type User = {
    id: number,
    userName: string,
    firstName: string,
    lastName: string,
    password?: string
};

export class UserStore {
    async index(): Promise<User[]> {
        var client = await pool.connect()
        
        const { rows } = await client.query(userQueries.getAllUser)

        const userList = rows.map((row) => {
            return {
                id : row.id,
                userName: row.username,
                firstName: row.firstname,
                lastName: row.lastname
            } 
        })

        client.release()


        return userList
    }


    async show(userId: Number): Promise<User | null> {
        var client = await pool.connect()

        const { rows } = await client.query(userQueries.getUser, [userId])  

        if( rows.length <= 0) return null

        client.release()

        return   {
            id: rows[0].id,
            userName: rows[0].username,
            firstName: rows[0].firstname,
            lastName: rows[0].lastname,
        } 
    }

    async create(user: User): Promise<User> {
        var client = await pool.connect()

        const pepper = process.env.SALT_PASSWORD 

        if(!pepper) throw new Error("Pepper not found")

        const userPayload = [
            user.userName,
            user.firstName,
            user.lastName,
            bcrypt.hashSync(user.password + pepper, Number(process.env.SALT)),
        ]

        const { rows } = await client.query(userQueries.createUser, userPayload)

        if(rows.length <= 0 ) throw new  Error("InternalError: User Account Not Created After ALl conditions passed")

        client.release()

        return  {
            id: rows[0].id,
            userName: rows[0].username,
            firstName: rows[0].firstname,
            lastName: rows[0].lastname,
        } 

    }

    async authenticate(userName: string, password: string): Promise<User | null> {
        var client = await pool.connect()

        const { rows } = await client.query(userQueries.getUserByUserName, [userName])

        if(rows.length <= 0 ) return null

        const user = rows[0]

        const pepper = process.env.SALT_PASSWORD 

        if(!pepper) throw new Error("Pepper not found")

        client.release()

        if(bcrypt.compareSync(password+pepper, user.password)) {
            return  {
                id: rows[0].id,
                userName: rows[0].username,
                firstName: rows[0].firstname,
                lastName: rows[0].lastname,
            } 
        } else throw new APIError("User is not Authorized", StatusCodes.UNAUTHORIZED, true)
    }

    async delete(userId: Number): Promise<null> {
        var client = await pool.connect()

        await client.query(userQueries.deleteUser, [userId])

        client.release()

        return null;
    }
}