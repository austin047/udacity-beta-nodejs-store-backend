import axios from "axios";
import server from "../src/server";
import { correctUser, noFirstNameUser } from "./mock/user";
import {
    StatusCodes,
} from 'http-status-codes';
import { IUser } from '../src/helpers/interfaceDef'

describe('## User Apis',  () => {
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



    describe("# POST /api/users", () => {
        it('should creat a new user', async (done) =>  {
            try {
                const response = await axios.post("/users", correctUser);

                expect(response.status).toBe(StatusCodes.CREATED)
                expect(response.data).toEqual(jasmine.any(Object));
            } catch(err) {
                done.fail(err)
            } finally {
                done()
            }
        });

        it('should return a 400 error if firstName not provided', async (done) =>  {
            try {
                const response = await axios.post("/users", noFirstNameUser)
                expect(response.status).toBe(StatusCodes.BAD_REQUEST)
            } catch(err) {
                done.fail(err)
            } finally{
                done()
            }
        });
    })

    describe("# GET /api/users", () => {
        it('should get list of users', async (done) =>  {
            try {
                const response = await axios.get("/users");
                expect(response.status).toBe(StatusCodes.OK)
                expect(response.data).toBeInstanceOf(Array);
            } catch(err) {
                done.fail(err)
            } finally{
                done()
            }
        });
    })

    describe("# GET /api/users/:userId", () => {
        let user:  IUser
        beforeAll(async (done) => {
            try {
              const response = await axios.post("/users", correctUser);
              user = response.data.user 

              axios.defaults.headers.common["Authorization"] = response.data.token;
            } catch (err) {
                done.fail(err)
            }
            finally{
                done() 
            }
          });


        it('should get user details', async (done) =>  {
            try {
                const response = await axios.get(`/users/${user.id}`);
                expect(response.status).toBe(StatusCodes.OK)

                const responseData = response.data as IUser;  
                expect(responseData.id).toBe(user.id)
                expect(responseData.firstName).toBe(user.firstName)
            } catch(err) {
                done.fail(err)
            } finally{
                done()
            }
             
             
            
        });


        it('should return notfound when user is is not present in system', async (done) =>  {
            try {
                const response = await axios.get(`/users/0`);
                expect(response.status).toBe(StatusCodes.NOT_FOUND)
            } catch(err) {
                done.fail(err)
            }finally{
                done()
            }
             
             
            
        });

        it('should return a status code of 403[FORBIDDEN] when retriving user details with out auth token', async (done) =>  {
            try {
                let wrongHeaderConfig = {
                    headers: {
                        Authorization: ""
                    }
                  }

                const response = await axios.get(`/users/${user.id}`, wrongHeaderConfig);
                expect(response.status).toBe(StatusCodes.FORBIDDEN)
            } catch(err) {
                done.fail(err)
            }
            finally{
                done()
            }
             
            
        });

        it('should return a status code of 401[UNAUTHORIZED] when retriving user details with wrong auth token', async (done) =>  {
            try {
                let wrongHeaderConfig = {
                    headers: {
                        Authorization: "wrongauthtoken",
                    }
                  }

                const response = await axios.get(`/users/${user.id}`, wrongHeaderConfig);
                expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
            } catch(err) {
                done.fail(err)
            } finally{
                done()
            }
             
            
        });

      })
   
});


