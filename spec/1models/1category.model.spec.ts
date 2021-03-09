import { CategoryStore, Category } from "../../src/models/category.model";

const categoryStore = new CategoryStore()

describe("Category Model", () => {
  it('should have an index method', () => {
    expect(categoryStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(categoryStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(categoryStore.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(categoryStore.delete).toBeDefined();
  });
 

  it('create method should add a category', async () => {
      // @ts-ignore
    const result = await categoryStore.create({name: "spinach"});

    expect(result).toEqual({
      id: 1,
      name: "spinach"

    });
  });

    it('show method should return the correct categories', async () => {
    const result = await categoryStore.show(1);
        expect(result).toEqual({
            id: 1,
            name: "spinach",
        });
    });

  it('index method should return a list of categories', async () => {
    const result = await  categoryStore.index();
    expect(result).toEqual([{
      id: 1,
      name: "spinach",
    }]);
  });

  it('delete method should remove the category', async () => {
    await categoryStore.delete(1);
    const result = await categoryStore.index()
    expect(result).toEqual([]);
  });

});