const { db } = require("../../../database/dbconfig.js");

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
  const id = await db("recipe_ingredients").insert(ingredient);

  return getRecipeIngredients(id);
}

function getRecipeIngredients(id) {
  return db("recipe_ingredients as ri")
    .join("recipes as r", "r.id", "ri.recipe_id")
    .join("ingredients as i", "i.id", "ri.ingredients_id")
    .join("quantities as q", "q.id", "ri.quantity_id")
    .select(
      "ri.id",
      "r.title as recipe_title",
      "i.name as ingredient",
      "quantity_value",
      "q.abbervation as unit_abbrevation"
    )
    .where("ri.recipe_id", { id })
    .first();
}

async function editRecipeIngredients(recipe_id, changes) {
  return db("recipe_ingredients")
    .where({ recipe_id })
    .update(changes, "id")
    .then(() => getRecipeIngredients(recipe_id));
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
