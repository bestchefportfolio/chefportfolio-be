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
  console.log("user: ", user);
  console.log("chef: ", chef);
  const id = await db("users").insert(user);
  console.log("id: ", id);
  const newChef = {
    user_id: id[0],
    ...chef
  };
  console.log("newChef: ", newChef);
  const chefID = await db("chefs").insert(newChef);

  const userObj = getBy(user.username);
  const chefObj = getByChefID(chefID);

  return { ...userObj, chefObj };
}

/* 
    ~~Todo~~
    add edit function
    add delete function
*/
