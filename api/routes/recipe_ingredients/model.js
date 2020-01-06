const db = require("../../../database/dbconfig.js");
const { getRecipeById } = require("../chef_recipes/model.js");

module.exports = {
  addRecipeIngredient,
  editRecipeIngredients,
  deleteRecipeIngredients,
  getRecipeIngredients
};

async function addRecipeIngredient(ingredient) {
  /* 
        ingredient = {
            recipe_id,
            ingredient_id,
            quantity_id,
            quantity_value
        }
    */
  const newIngredient = await db("recipe_ingredients").insert(ingredient);
  console.log("newIngredient: ", newIngredient);
  return getRecipeIngredients(newIngredient.recipe_id);
}

async function getRecipeIngredients(id) {
  const recipe = await getRecipeById(id);
  const ingredients = await db("recipe_ingredients as ri")
    .join("recipes as r", "r.id", "ri.recipe_id")
    .join("ingredients as i", "i.id", "ri.ingredient_id")
    .join("quantites as q", "q.id", "ri.quantity_id")
    .select(
      "ri.id",
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
  console.log("recipe_id: ", recipe_id);
  console.log("ingredient_id: ", ingredient_id);
  console.log("changes: ", changes);
  return db("recipe_ingredients as ri")
    .where("ri.ingredient_id", ingredient_id)
    .update(changes, "id")
    .then(() => {
      return getRecipeIngredients(recipe_id);
    });
}

function deleteRecipeIngredients(id) {
  return getRecipeIngredientsById(id).then(res => {
    return db("recipe_ingredients")
      .where({ id })
      .del()
      .then(() => res)
      .catch(err => console.log(err));
  });
}

function getRecipeIngredientsById(id) {
  return db("recipe_ingredients")
    .where({ id })
    .first();
}
