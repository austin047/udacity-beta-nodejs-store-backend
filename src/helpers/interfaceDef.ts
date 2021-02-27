export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
};

export interface  ICategory {
    id: number,
    name: string,
};

export interface IOrder {
    id: number,
    userId: number,
    status: string
};

export interface IProduct {
    id: number,
    name: string,
    price: number,
    categoryId: number
};

export interface IOrderProduct {
    userId: number,
    orderId: number,
    productId: number,
    quantity: number
};