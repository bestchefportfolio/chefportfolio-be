const { db } = require("./index.js");

module.exports = function(chefID) {
  return db("chefs as c")
    .join("users as u", "u.id", "c.user_id")
    .join("u.name as chef_name", "c.business_name")
    .where("c.id", chefID);
};
