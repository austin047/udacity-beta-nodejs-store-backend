export const orderQueries = {
    createOrder: "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *",
    getOrderById: "SELECT id, user_id, status FROM orders WHERE id = $1",
    getAllorders: "SELECT * FROM orders",
    createOrderProduct: "INSERT INTO order_products (user_id, order_id, product_id, product_qty) VALUES ($1, $2, $3, $4) RETURNING *",
    getOrderByUser: "SELECT * FROM orders left join order_products on orders.user_id=$1 where status=$2"
  } 