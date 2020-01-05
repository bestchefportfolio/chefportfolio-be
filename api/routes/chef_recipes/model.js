const { getBy } = require("../auth/model.js");
const db = require("../../../database/dbconfig.js");

module.exports = {
  addRecipe,
  getChefsRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe
};

function addRecipe(recipe) {
  // recipe should contain chef_id and title and instructions
  return db("recipes").insert(recipe, "id");
}

function getChefsRecipes(chefID) {
  return db("recipes as r")
    .join("chefs as c", "c.id", " r.chef_id")
    .select("r.id", "r.title", "r.instructions")
    .where("r.chef_id", chefID);
}

function getRecipeById() {
  return null;
}

function editRecipe() {
  return null;
}

function deleteRecipe() {
  return null;
}
