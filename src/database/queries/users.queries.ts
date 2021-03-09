export const userQueries = {
    createUser: "INSERT INTO users (userName, firstName, lastName, password) values ($1, $2, $3, $4) RETURNING *",
    deleteUser: "DELETE FROM users where id=$1",
    getUser: "SELECT id, username, firstname, lastname FROM users WHERE id = $1",
    getAllUser: "SELECT id, username, firstname, lastname FROM users",
    getUserByUserName: "SELECT * FROM users WHERE username=($1)"
  }