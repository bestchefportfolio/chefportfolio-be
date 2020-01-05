const { getBy } = require("../auth/model.js");
const db = require("../../../database/dbconfig.js");

module.exports = {
  addRecipe,
  getChefsRecipes,
  getChefById,
  editRecipe,
  deleteRecipe
};

function getChefById(chefID) {
  return db("chefs as c")
    .join("users as u", "u.id", "c.user_id")
    .select("u.name as chef_name", "c.business_name")
    .where("c.id", chefID);
}

// async function getChefsRecipes(chefID) {
//   const [chefObj] = await getChefById(chefID);
//   const recipeObj = await db("chef_recipes as cr")
//     .join("chefs as c", "c.id", "cr.chef_id")
//     .join("recipes as r", "r.id", "cr.recipe_id")
//     .select("cr.recipe_id", "r.title", "r.servings", "r.instructions")
//     .where("cr.chef_id", chefID);
//   const recipeID = recipeObj.length -1
//   const ingredients = await getRecipeIngredients(recipeID);

//   const chefRecipes = {
//     chef: chefObj,
//     recipes: { recipeObj, ingredients }
//   };
//   return chefRecipes;
// }

async function getChefsRecipes(chefID) {
  return db("chef_recipes as cr")
    .join("chefs as c", "c.id", "cr.chef_id")
    .join("recipes as r", "r.id", "cr.recipe_id")
    .select("cr.recipe_id", "r.title", "r.servings", "r.instructions")
    .where("cr.chef_id", chefID);
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

function getRecipeIngredients(id) {
  return db("recipe_ingredients as ri")
    .join("recipes as r", "r.id", "ri.recipe_id")
    .join("ingredients as i", "i.id", "ri.ingredient_id")
    .join("quantites as q", "q.id", "ri.quantity_id")
    .select("i.name", "q.unit", "ri.quantity_value", "q.abbreviation")
    .where("ri.recipe_id", id);
}

function editRecipe(id, changes) {
  return db("recipes")
    .where({ id })
    .update(changes, "id")
    .then(() => getRecipeByID(id));
}

function deleteRecipe(id) {
  return getRecipeByID(id).then(res => {
    return db("recipes")
      .where({ id })
      .del()
      .then(() => res)
      .catch(err => console.log(err));
  });
}
