import axios from "axios";
import server from "../../src/server";
import { correctUser, noFirstNameUser } from "../mock/user";
import {
    StatusCodes,
} from 'http-status-codes';
import { IUser, ICategory } from '../../src/helpers/interfaceDef'
import { correctCategory } from "../mock/category";
import { User } from "../../src/models/user.model";
import { Category } from "../../src/models/category.model";

describe('## Categories Apis',  () => {
    axios.defaults.baseURL = `http://localhost:3000/api`
    axios.interceptors.response.use((config) => {
        /** In test, intercepts response prevent default throw exception on promis rejection from API*/
        return config;
    }, (error) => {
        if(error.isAxiosError) return Promise.resolve(error.response)
        else return Promise.reject(error);
    });

    let user: User
    let category: Category


    beforeAll(async (done) => {
        server
        try {
            const userResponse = await axios.post("/users", correctUser);
                expect(userResponse.data.user.firstName).toBe(correctUser.firstName)
                user = userResponse.data.user

                axios.defaults.headers.common["Authorization"] = `Bearer ${userResponse.data.token}`
                done()
        } catch(err) {
            done.fail(err)
        }
           
       
    })

    describe("# POST /api/categories", () => {
       
        
        it('should creat a new category', async (done) =>  {
            try {
                const response = await axios.post("/categories", correctCategory);

                category = response.data

                expect(response.status).toBe(StatusCodes.CREATED)
                expect(response.data).toEqual(jasmine.any(Object));
                // gcategory = response.data.user 
            } catch(err) {
                done.fail(err)
            } finally{
                done()
            }
        });

        it('should return a 400[BadRequest] error if name not provided', async (done) =>  {
            try {
                const response = await axios.post("/categories", {})
                expect(response.status).toBe(StatusCodes.BAD_REQUEST)
            } catch(err) {
                done.fail(err)
            } finally{
                done()
            }
        });

        it('should get list of categories', async (done) =>  {
            try {
                const response = await axios.get("/categories");
                expect(response.status).toBe(StatusCodes.OK)
                expect(response.data).toBeInstanceOf(Array);
            } catch(err) {
                done.fail(err)
            } finally{
                done()
            }
        });
    })

    describe("# GET /api/categories/:categoryId", () => {

        it('should get category details', async (done) =>  {
            try {
                const response = await axios.get(`/categories/${category.id}`);
                expect(response.status).toBe(StatusCodes.OK)
                const responseData = response.data as ICategory;  


                expect(responseData.id).toBe(category.id)
                expect(responseData.name).toBe(category.name)
                done()
            } catch(err) {
                done.fail(err)
            }  
        });


        it('should return notfound when category id is not present', async (done) =>  {
            try {
                const response = await axios.get(`/categories/${0}`);
                expect(response.status).toBe(StatusCodes.NOT_FOUND)
                done()
            } catch(err) {
                done.fail(err)
            }
             
            
        });

        it('should return a status code of 403[FORBIDDEN] when retriving category details with out auth token', async (done) =>  {
            try {
                let wrongHeaderConfig = {
                    headers: {
                        Authorization: ""
                    }
                  }

                const response = await axios.get(`/categories/${category.id}`, wrongHeaderConfig);
                expect(response.status).toBe(StatusCodes.FORBIDDEN)
                done()
            } catch(err) {
                done.fail(err)
            } 
            
            
        });

        it('should return a status code of 401[UNAUTHORIZED] when retriving category  details with wrong auth token', async (done) =>  {
            try {
                let wrongHeaderConfig = {
                    headers: {
                        Authorization: "Bearer wrongauthtoken",
                    }
                  }
                const response = await axios.get(`/categories/${category.id}`, wrongHeaderConfig);
                expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
            } catch(err) {
                done.fail(err)
            } finally{
                done()
            }
        });

        it('should delete a category', async (done) =>  {
            try {
                const response = await axios.delete(`/categories/${category.id}`);
                expect(response.status).toBe(StatusCodes.OK)
                done()
            } catch(err) {
                done.fail(err)
            }  
        });

      })
   
});


