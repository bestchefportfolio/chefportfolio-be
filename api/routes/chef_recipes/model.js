const { getBy } = require("../auth/model.js");
const db = require("../../../database/dbconfig.js");

module.exports = {
  addRecipe,
  getChefsRecipes,
  getChefById,
  editRecipe,
  deleteRecipe
};

function getChefsRecipes(chefID) {
  return db("chef_recipes as cr")
    .join("chefs as c", "c.id", "cr.chef_id")
    .join("recipes as r", "r.id", "cr.recipe_id")
    .select(
      "cr.chef_id",
      "cr.recipe_id",
      "r.title",
      "r.servings",
      "r.instructions"
    )
    .where("cr.chef_id", chefID);
}

function getChefById(chefID) {
  return db("chefs as c")
    .join("users as u", "u.id", "c.user_id")
    .select("u.name as chef_name", "c.business_name")
    .where("c.id", chefID);
}

async function addRecipe(chefID, recipe) {
  const recipeID = await db("recipes").insert(recipe, "id");

  const newChefRecipe = {
    chef_id: chefID,
    recipe_id: recipeID[0]
  };

  await db("chef_recipes").insert(newChefRecipe);
  return getChefsRecipes(chefID);
}

function getRecipeByID(id) {
  return db("recipes")
    .where({ id })
    .first();
}

function editRecipe(id, changes) {
  return db("recipes")
    .where({ id })
    .update(changes, "id")
    .then(() => getRecipeByID(id));
}

function deleteRecipe() {
  return null;
}
