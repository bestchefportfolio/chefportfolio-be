const db = require("../../../database/dbconfig.js");

module.exports = {
  add,
  getBy,
  addChef,
  editUser,
  deleteUser,
  editChef,
  deleteChef,
  getAllUsernames,
  getByUserDetail,
  getByChefDetail
};

function add(user) {
  return db("users").insert(user, "id");
}

function getBy(user) {
  return db("users")
    .select("u.username")
    .where(user)
    .first();
}

function getByUserDetail(detail) {
  return db("users").where(detail);
}

function getUserById(id) {
  return db("users as u")
    .select("u.id", "u.username", "u.email", "u.name")
    .where({ id })
    .first();
}

function getByChefID(chefID) {
  return db("chefs")
    .select("chefs.id", "chefs.username")
    .where(chefID)
    .first();
}

function getByChefDetail(detail) {
  return db("chefs").where(detail);
}

async function addChef(user, chef) {
  const id = await db("users").insert(user);
  const newChef = {
    user_id: id[0],
    ...chef
  };
  const chefID = await db("chefs").insert(newChef);
}

function editUser(userID, changes) {
  return db("users")
    .where("users.id", userID)
    .update(changes)
    .then(() => getUserById(userID));
}

function deleteUser(userID) {
  return db("users")
    .where("users.id", userID)
    .del();
}

async function editChef(chefID, changes) {
  const chefChanges = {
    location: changes.location,
    phone_number: changes.phone_number,
    business_name: changes.business_name
  };
  console.log("chefChanges: ", chefChanges);
  const userChanges = {
    username: changes.username,
    password: changes.password,
    email: changes.email,
    name: changes.name
  };
  console.log("userChanges: ", userChanges);
  await db("chefs")
    .where("chefs.id", chefID)
    .update(chefChanges, "id");
  const chefObj = await getByChefID(chefID);
  console.log("chefObj: ", chefObj, `\n`);
  return editUser(chefObj.user_id, userChanges);
}

async function deleteChef() {
  const chefObj = await db("chef")
    .where(chefID)
    .first();
  console.log("chefObj: ", chefObj, `\n`);
  return deleteUser(chefObj.user_id);
}

function getAllUsernames() {
  return db("users").select("users.username", "users.name");
}
