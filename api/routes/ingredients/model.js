const db = require("../../../database/dbconfig.js");

module.exports = {
  getAllIngredients,
  addIngredient,
  getQuantityType,
  addIngredientToRecipe,
  getAllMealTypes
};

function getAllIngredients() {
  return db("ingredients");
}

function addIngredient(ingredient) {
  return db("ingredients").insert(ingredient, "id");
}

function getIngredientByDetail(detail) {
  return db("ingredients").where(detail);
}

function getQuantityType() {
  return db("quantites");
}

function getQuantityByDetail(detail) {
  return db("quantities").where(detail);
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

function getAllMealTypes() {
  return db("meal_types");
}

function addMealType(meal_types) {
  return db("meal_typess").insert(meal_types, "id");
}

function getMealTypeByDetail(detail) {
  return db("meal-types").where(detail);
}
