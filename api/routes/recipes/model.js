const db = require("../../../database/dbconfig.js");

module.exports = {
  getAllRecipes,
  getById,
  getRecipeMealTypes,
};


function getAllRecipes() {
  return db("recipes");
}

function getRecipeMealTypes() {
  return db("recipe_meal_types as rmt")
    .join("recipes as r", "r.id", "rmt.recipe_id")
    .join("meal_types as mt", "mt.id", "rmt.meal_type_id")
    .select(
      "r.id as recipe_id",
      "r.title",
      "r.servings",
      "r.instructions",
      "r.images",
      "mt.type"
    );
}

function getById(id) {
  return db("recipes").where(id);
}
