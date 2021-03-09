import { OrderStore, Order } from "../../src/models/order.model";
import { CategoryStore, Category } from "../../src/models/category.model";
import { UserStore, User } from "../../src/models/user.model";
import { Product, ProductStore } from "../../src/models/product.model";

const orderStore = new OrderStore()
const categoryStore = new CategoryStore()
const userStore = new UserStore()
const productStore = new ProductStore()



describe("Procuct Model", () => {
  it('should have an index method', () => {
    expect(orderStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(orderStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderStore.create).toBeDefined();
  });

  it('should have an orderByUser method', () => {
    expect(orderStore.orderByUser).toBeDefined();
  });

  it('should have an orderUserByStatus method', () => {
    expect(orderStore.orderUserByStatus).toBeDefined();
  });

  it('should have a productsForOrder method', () => {
    expect(orderStore.productsForOrder).toBeDefined();
  });

  it('should have an update method', () => {
    expect(orderStore.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(orderStore.delete).toBeDefined();
  });

  let user : User;
  let category: Category;
  let product: Product;

  beforeAll(async (done) => {
    // @ts-ignore
    user = await userStore.create({userName: "mistro", firstName: "Main Mistro", lastName: "Maistro Man", password: "password123"});

    // @ts-ignore
    category = await categoryStore.create({name: "spinach"});

    // @ts-ignore
    product = await productStore.create({name: "fries", price: 200, categoryId: category.id});

    done()
  })
 

  it('create method should add a order', async () => {
    // @ts-ignore
    const result = await orderStore.create({userId: user.id, status: "pending"});

    expect(result).toEqual({id: 1, userId: user.id, status: "pending"});
  });

  it('show method should return the correct order', async () => {
  const result = await orderStore.show(1);
      expect(result).toEqual({
        id: 1, 
        userId: user.id, 
        status: "pending"
      });
  });

  it('index method should return a list of order', async () => {
    const result = await  orderStore.index();
    expect(result).toEqual([{
      id: 1, 
      userId: user.id, 
      status: "pending"
    }]);
  });

  it('createOrderProduct  method should return an order product', async () => {
    const result = await orderStore.createOrderProduct(1, product.id, 3)

      expect(result).toEqual({
          id: 1,
          orderId: 1,
          productId: product.id,
          productQty: 3
      });
  });

  it('productsForOrder method should return an product for an order', async () => {
    const result = await orderStore.productsForOrder(1)

      expect(result).toEqual([{
          id: product.id, 
          name: product.name,
          price: product.price,
          categoryId: product.categoryId
      }]);
  });

  it('updated method should return an updated order status with status complete', async () => {
    const result = await  orderStore.update("complete", 1);
    expect(result).toEqual({
      id: 1, 
      userId: user.id, 
      status: "complete"
    });
  });

  it('productsForOrder method should return an product for an order', async () => {
    const result = await orderStore.orderUserByStatus(user.id, "complete")

    expect(result).toEqual([{
      id: 1, 
      userId: user.id, 
      status: "complete"
    }]);
  });



  it('delete method should remove the order', async () => {
    await orderStore.delete("1");
    const result = await orderStore.index()
    expect(result).toEqual([]);
  });

  afterAll(async (done) => {
    
    await userStore.delete(user.id);

    
    await categoryStore.delete(category.id);

    
   await productStore.delete(product.id);

   done()
  })
 

});