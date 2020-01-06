const db = require("../../../database/dbconfig.js");
const { getRecipeById } = require("../chef_recipes/model.js");

module.exports = {
  addRecipeIngredient,
  editRecipeIngredients,
  deleteRecipeIngredients,
  getRecipeIngredients
};

async function addRecipeIngredient(ingredient) {
  const id = ingredient.recipe_id;
  await db("recipe_ingredients").insert(ingredient);
  return getRecipeIngredients(id);
}

async function getRecipeIngredients(id) {
  const recipe = await getRecipeById(id);
  const ingredients = await db("recipe_ingredients as ri")
    .join("recipes as r", "r.id", "ri.recipe_id")
    .join("ingredients as i", "i.id", "ri.ingredient_id")
    .join("quantites as q", "q.id", "ri.quantity_id")
    .select(
      "ri.id as recipe_ingredient_id",
      "ri.ingredient_id",
      "i.name as ingredient",
      "quantity_value",
      "q.abbreviation as unit_abbreviation"
    )
    .where("ri.recipe_id", id);
  const recipeIngredients = {
    recipe: recipe,
    ingredients: ingredients
  };

  return recipeIngredients;
}

async function editRecipeIngredients(recipe_id, ingredient_id, changes) {
  return db("recipe_ingredients as ri")
    .where("ri.ingredient_id", ingredient_id)
    .update(changes, "id")
    .then(() => {
      return getRecipeIngredients(recipe_id);
    });
}

function deleteRecipeIngredients(recipe_id, ingredient_id) {
  return db("recipe_ingredients as ri")
    .where("ri.id", ingredient_id)
    .del()
    .then(() => getRecipeIngredients(recipe_id));
}

function getRecipeIngredientsById(id) {
  return db("recipe_ingredients")
    .where({ id })
    .first();
}
