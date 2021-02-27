import axios from "axios";
import server from "../src/server";
import { correctUser } from "./mock/user";
import {
    StatusCodes,
} from 'http-status-codes';
import { IUser, IProduct, ICategory } from '../src/helpers/interfaceDef'

import { correctProduct } from "./mock/product";
import { correctCategory } from "./mock/category";

describe('## products Apis',  () => {
    axios.defaults.baseURL = `http://localhost:3000/api`
    axios.interceptors.response.use((config) => {
        /** In dev, intercepts request and logs it into console for dev */
        return config;
    }, (error) => {
        if(error.isAxiosError) return Promise.resolve(error.response)
        else return Promise.reject(error);
    });

    let category: ICategory

    beforeAll(async (done) => {
        server;
        const userResponse = await axios.post("/users", correctUser);
        axios.defaults.headers.common["Authorization"] = userResponse.data.token;
        
        const response = await axios.post("/categories", correctCategory);
        expect(response.status).toBe(StatusCodes.CREATED)
        category = response.data
        done()
    })


    describe("# POST /api/products", () => {

        it('should create a new product', async (done) =>  {
            try {
                // let newCorrectProduct = correctProduct.categoryId = category.id

                const newCorrectProduct = {
                    name: "Biscuit",
                    price: 20,
                    categoryId: category.id
                };                                
                const response = await axios.post("/products", newCorrectProduct);

                expect(response.status).toBe(StatusCodes.CREATED)
                expect(response.data).toEqual(jasmine.any(Object));
                done()
            } catch(err) {
                done.fail(err)
            } finally{

                done()
            }
        });

        it('should return a 400[error if name BadRequest]', async (done) =>  {
            try {
                const response = await axios.post("/products", {})
                expect(response.status).toBe(StatusCodes.BAD_REQUEST)
                done()
            } catch(err) {
                done.fail(err)
            } finally{
                done()
            }
        });
    })

    describe("# GET /api/products", () => {
        it('should get list of products', async (done) =>  {
            try {
                const response = await axios.get("/products");
                expect(response.status).toBe(StatusCodes.OK)
                expect(response.data).toBeInstanceOf(Array);
            } catch(err) {
                done.fail(err)
            } finally{
                done()
            }
        });
    })

    describe("# GET /api/products/:productId", () => {
        let product:  IProduct

        beforeAll(async (done) => {
            try {
             const newCorrectProduct = {
                name: "Biscuit",
                price: 20,
                categoryId: category.id
            };

            const productResponse = await axios.post("/products", newCorrectProduct);

              product = productResponse.data
              done()
            } catch (err) {
                done.fail(err)
            }
          });


        it('should get product details', async (done) =>  {
            try {
                const response = await axios.get(`/products/${product.id}`);
                expect(response.status).toBe(StatusCodes.OK)
                const responseData = response.data as IProduct;  


                expect(responseData.id).toBe(product.id)
                expect(responseData.name).toBe(product.name)
                done()
            } catch(err) {
                done.fail(err)
            }  
        });

        it('should return notfound when product id is not present', async (done) =>  {
            try {
                const response = await axios.get(`/products/${0}`);
                expect(response.status).toBe(StatusCodes.NOT_FOUND)
                done()
            } catch(err) {
                done.fail(err)
            }
             
            
        });

        

        it('should return a status code of 401[UNAUTHORIZED] when retriving product  details with wrong auth token', async (done) =>  {
            try {
                let wrongHeaderConfig = {
                    headers: {
                        Authorization: "wrongauthtoken",
                    }
                  }
                  
                  
                const response = await axios.get(`/products/${product.id}`, wrongHeaderConfig);
                expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
                done()
            } catch(err) {
                done.fail(err)
            }
             finally{
               done() 
            }
            
        });

    })
   
});


