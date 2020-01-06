const { getRecipeByID } = require("./index.js");
const { db } = require("./index.js");

module.exports = function deleteRecipe(id) {
    return getRecipeByID(id).then(res => {
      return db("recipes")
        .where({ id })
        .del()
        .then(() => res)
        .catch(err => console.log(err));
    });
  }