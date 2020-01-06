const db = require("../../../database/dbconfig.js");

module.exports = {
  getAllIngredients,
  addIngredient,
  getQuantityType,
  addIngredientToRecipe
};

function getAllIngredients() {
  return db("ingredients");
}

function addIngredient(ingredient) {
  return db("ingredients").insert(ingredient, "id");
}

function getQuantityType() {
  return db("quantites");
}

function addIngredientToRecipe(ingredient) {
  /* 
        ingredient should have = {
            recipe_id
            ingredient_id
            quantity_id
            quantity_value
        } 
    */
  return db("recipe_ingredients").insert(ingredient, "id");
}
