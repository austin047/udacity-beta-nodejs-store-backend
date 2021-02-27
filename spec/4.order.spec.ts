import axios from "axios";
import server from "../src/server";
import { correctUser, noFirstNameUser } from "./mock/user";
import {
    StatusCodes,
} from 'http-status-codes';
import { IUser, IOrder, IOrderProduct, IProduct, ICategory } from '../src/helpers/interfaceDef'
import { correctCategory } from "./mock/category";


describe('## orders Apis',  () => {
    axios.defaults.baseURL = `http://localhost:3000/api`
    axios.interceptors.response.use((config) => {
        /** In test, intercepts response prevent default throw exception on promis rejection from API*/
        return config;
    }, (error) => {
        if(error.isAxiosError) return Promise.resolve(error.response)
        else return Promise.reject(error);
    });

    beforeAll(() => {
        server
    })

    describe("# GET /api/orders/users/:userId", () => {
       let order:  IOrderProduct
       let user: IUser
       let product: IProduct
       let category: ICategory

        beforeAll(async (done) => {
            try {
              const userResponse = await axios.post("/users", correctUser);
              expect(userResponse.status).toBe(StatusCodes.CREATED)
              user = userResponse.data.user

              expect(userResponse.data.user.firstName).toBe(correctUser.firstName)
              expect(userResponse.data.token).toEqual(jasmine.any(String))
              axios.defaults.headers.common["Authorization"] = userResponse.data.token;
              

              const categoryResponse = await axios.post("/categories", correctCategory);
              expect(categoryResponse.status).toBe(StatusCodes.CREATED)
              category = categoryResponse.data as ICategory
             

              expect(category).toEqual(jasmine.any(Object));
              expect(category.id).toEqual(jasmine.any(Number))

              const newProductPayload = {
                name: "Biscuit",
                price: 20,
                categoryId: category.id
              };

              const productResponse = await axios.post("/products", newProductPayload);
              expect(productResponse.status).toBe(StatusCodes.CREATED)
              expect(productResponse.data).toEqual(jasmine.any(Object));
              expect(productResponse.data.id).toEqual(jasmine.any(Number));
              product = productResponse.data

              done()
            } catch (err) {
                done.fail(err)
            } finally {
                done()
            }
          });

          describe("# GET /api/users", () => {
            
            it('should create new order',  async (done) => {
                try {

                    const newOrder  = {
                        status: "complete",
                        productId: product.id,
                        productQty: 5
                    }

                const orderResponse = await axios.post(`/orders/users/${user.id}`, newOrder);

                // if(userResponse.status !== StatusCodes.OK) done.fail(orderResponse.data)
                expect(orderResponse.status).toBe(StatusCodes.CREATED)
                expect(orderResponse.data).toEqual(jasmine.any(Object));

                order = orderResponse.data as IOrderProduct
                done()
                } catch(err) {
                    done.fail(err)
                } finally {
                    done()
                }
            });

            it('should return a status code of 401[UNAUTHORIZED] when creating order details with wrong auth token', async (done) =>  {
                try {
                    let wrongHeaderConfig = {
                        headers: {
                            Authorization: "wrongauthtoken",
                        }
                      }
                      
                      
                      const newOrder  = {
                        status: "complete",
                        productId: product.id,
                        productQty: 5
                    }

                const orderResponse = await axios.post(`/orders/users/${user.id}`, newOrder, wrongHeaderConfig);

                // if(userResponse.status !== StatusCodes.OK) done.fail(orderResponse.data)
                expect(orderResponse.status).toBe(StatusCodes.UNAUTHORIZED)
                done()
                } catch(err) {
                    done.fail(err)
                } finally {
                    done()
                }
                 
                
            });

            it('should return a status code of 403[FORBIDEN] when creating order details with wrong no auth token', async (done) =>  {
                try {
                    let noAuthHeaderConfig = {
                        headers: {
                            Authorization: ""
                        }
                    }
                      
                    const newOrder  = {
                        status: "complete",
                        productId: product.id,
                        productQty: 5
                    }

                const orderResponse = await axios.post(`/orders/users/${user.id}`, newOrder, noAuthHeaderConfig);
                expect(orderResponse.status).toBe(StatusCodes.FORBIDDEN)
                done()
                } catch(err) {
                    done.fail(err)
                } finally {
                    done()
                }
                
            });

            it('should retieve complete order given order id',  async (done) => {
                try {
                const orderResponse = await axios.get(`/orders/users/${user.id}?status=complete`);
                
                expect(orderResponse.status).toBe(StatusCodes.OK)
                expect(orderResponse.data).toEqual(jasmine.any(Array))

                done()
                } catch(err) {
                    done.fail(err)
                }  finally {
                    done()
                }
            });

            it('should return a status code of 400[BAD_REQUEST] when retrieving order with wrong status',  async (done) => {
                try {

                const wrongStatus = "omplete" //Options 'complete' 'pending'

                const orderResponse = await axios.get(`/orders/users/${user.id}?status=${wrongStatus}`);

                expect(orderResponse.status).toBe(StatusCodes.BAD_REQUEST)

                done()
                
                } catch(err) {
                    done.fail(err)
                } finally {
                    done()
                }
            })


            it('should return a status code of 403[FORBIDEN] when creating order details with wrong no auth token',  async (done) => {
                try {
                    let noAuthHeaderConfig = {
                        headers: {
                            Authorization: ""
                        }
                    }

                const orderResponse = await axios.get(`/orders/users/${user.id}?status=complete`, noAuthHeaderConfig);

                expect(orderResponse.status).toBe(StatusCodes.FORBIDDEN)
                done()
                } catch(err) {
                    done.fail(err)
                } finally {
                    done()
                }
            });

        })

      })
   
});


