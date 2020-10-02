const db = require("../database/connection.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

// modified to join the roles table and return the role name.
function find() {
  return db("users as u")
    .join("roles as r", "u.role", "r.id")
    .select("u.id", "u.username", "r.name as rolename");
}

// modified to join the roles table and return the role name.
function findBy(filter) {
  return db("users as u")
    .join("roles as r", "u.role", "r.id")
    .select("u.id", "u.username", "r.name as rolename", "u.password")
    .where(filter).orderBy("u.id");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("users").where({ id }).first();
}
