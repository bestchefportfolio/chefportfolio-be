const db = require("../../../database/dbconfig.js");

module.exports = {
  add,
  getBy
};

function add(user) {
  return db("users").insert(user, "id");
}

function getBy(user) {
  return db("users")
    .where(user)
    .first();
}
