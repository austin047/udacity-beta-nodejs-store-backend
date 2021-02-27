export const productQueries = {
    createProduct: "INSERT INTO products (name, price, category_id) values ($1, $2, $3) RETURNING *",
    getProductById: "SELECT id, name, price, category_id FROM products WHERE id = $1",
    getAllProducts: "SELECT * FROM products",
    getProductByCategory: "SELECT * FROM products WHERE category_id=$1"
  } 