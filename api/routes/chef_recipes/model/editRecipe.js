const { getRecipeByID } = require("./index.js");
const { db } = require("./index.js");

module.exports = function editRecipe(id, changes) {
    return db("recipes")
      .where({ id })
      .update(changes, "id")
      .then(() => getRecipeByID(id));
  }