export const userQueries = {
    createUser: "INSERT INTO users (firstName, lastName, password) values ($1, $2, $3) RETURNING *",
    deleteUser: "DELETE FROM USERS where id=$1",
    getUser: "SELECT id, firstname, lastname FROM users WHERE id = $1",
    getAllUser: "SELECT id, firstname, lastname FROM users"
  }