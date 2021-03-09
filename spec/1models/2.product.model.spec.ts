import { ProductStore, Product } from "../../src/models/product.model";
import { CategoryStore } from "../../src/models/category.model";

const productStore = new ProductStore()
const categoryStore = new CategoryStore()


describe("Product Model", () => {
  it('should have an index method', () => {
    expect(productStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(productStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(productStore.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(productStore.delete).toBeDefined();
  });
 

  it('create method should add a product', async () => {

    // @ts-ignore
    const categoryResult = await categoryStore.create({name: "spinach"});

    // expect(categoryResult.id).toBeInstanceOf(Number);

    // @ts-ignore
    const result = await productStore.create({name: "fries", price: 200, categoryId: categoryResult.id});

    expect(result).toEqual({id: 1, name: "fries", price: 200, categoryId: 2});
  });

  it('show method should return the correct product', async () => {
  const result = await productStore.show(1);
      expect(result).toEqual({
        id: 1, 
        name: "fries", 
        price: 200, 
        categoryId: 2
      });
  });

  it('index method should return a list of product', async () => {
    const result = await  productStore.index();
    expect(result).toEqual([{
      id: 1, 
      name: "fries", 
      price: 200, 
      categoryId: 2
    }]);
  });

  it('delete method should remove the product', async () => {
    await productStore.delete(1);
    const result = await productStore.index()
    expect(result).toEqual([]);
  });

});