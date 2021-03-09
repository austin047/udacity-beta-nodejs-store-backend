import { UserStore, User } from "../../src/models/user.model";

const userStore = new UserStore()

describe("User Model", () => {
  it('should have an index method', () => {
    expect(userStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(userStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(userStore.create).toBeDefined();
  });

  it('should have an autheticate method', () => {
    expect(userStore.authenticate).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(userStore.delete).toBeDefined();
  });
 

  it('create method should add a user', async () => {
      // @ts-ignore
    const result = await userStore.create({userName: "mistro", firstName: "Main Mistro", lastName: "Maistro Man", password: "password123"});

    expect(result).toEqual({
      id: 1,
      userName: "mistro", 
      firstName: "Main Mistro", 
      lastName: "Maistro Man", 
      });
  });

    it('show method should return the correct user', async () => {
    const result = await userStore.show(1);
      expect(result).toEqual({
        id: 1,
        userName: "mistro", 
        firstName: "Main Mistro", 
        lastName: "Maistro Man", 
        });
      });
  

  it('index method should return a list of user', async () => {
    const result = await  userStore.index();
    expect(result).toEqual([{
      id: 1,
      userName: "mistro", 
      firstName: "Main Mistro", 
      lastName: "Maistro Man", 
    }]);
  });

  it('index method should return a authenticated user', async () => {
    const result = await  userStore.authenticate("mistro", "password123")

    expect(result).toEqual({
      id: 1,
      userName: "mistro", 
      firstName: "Main Mistro", 
      lastName: "Maistro Man", 
    });

  });

  it('delete method should remove the user', async () => {
    await userStore.delete(1);
    const result = await userStore.index()
    expect(result).toEqual([]);
  });

});