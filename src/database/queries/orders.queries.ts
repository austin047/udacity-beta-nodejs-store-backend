export const orderQueries = {
    createOrder: "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *",
    getOrderById: "SELECT id, user_id, status FROM orders WHERE id = $1",
    getAllorders: "SELECT * FROM orders",
    createOrderProduct: "INSERT INTO order_products (order_id, product_id, product_qty) VALUES ($1, $2, $3) RETURNING *",
    getOrderByUserStatus: "SELECT * FROM orders WHERE user_id=$1 AND status=$2",
    getOrderByUser: "SELECT * FROM orders WHERE user_id=$1",
    deleteOrder: "DELETE FROM orders WHERE id=$1",
    updateOrder: "UPDATE orders SET status=$1 WHERE id=$2 RETURNING *",
    productsForOrder: "SELECT products.id, products.name, products.price, products.category_id FROM products INNER JOIN order_products on products.id=order_products.product_id WHERE order_products.order_id=$1"
  } 

  
  //DELETE FROM order_products INNER JOIN  orders ON orders_products.order_id=orders.id; 
  //getOrderByUser: "SELECT * FROM orders inner join order_products on orders.id=order_products.order_id",
