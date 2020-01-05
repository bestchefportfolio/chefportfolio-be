const db = require("../../../database/dbconfig.js");

module.exports = {
  add,
  getBy,
  addChef
};

function add(user) {
  return db("users").insert(user, "id");
}

function getBy(user) {
  return db("users")
    .where(user)
    .first();
}

function getByChefID(chefID) {
  return db("chefs")
    .where(chefID)
    .first();
}

async function addChef(user, chef) {
  const id = await db("users").insert(user);
  const newChef = {
    user_id: id[0],
    ...chef
  };
  const chefID = await db("chefs").insert(newChef);
}

/* 
    ~~Todo~~
    add edit function
    add delete function

    different folder also add a way to update a user into a chef
*/
