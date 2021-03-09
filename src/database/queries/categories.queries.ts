export const categoryQueries = {
    createCategory: "INSERT INTO categories (name) values ($1) RETURNING *",
    getCategoryById: "SELECT id, name FROM categories WHERE id = $1",
    getAllCategories: "SELECT * FROM categories",
    deleteCategory: "DELETE FROM categories where id=$1",

  } 