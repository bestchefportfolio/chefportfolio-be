const db = require("../../../database/dbconfig.js");

module.exports = {
  addRecipe,
  editRecipe,
  deleteRecipe,
  getRecipeById,
  getChefById,
  getChefRecipes,
  getChefRecipesDetails,
  getByRecipeDetail
};

async function addRecipe(chefID, recipe) {
  const recipeID = await db("recipes").insert(recipe, "id");

  const newChefRecipe = {
    chef_id: chefID,
    recipe_id: recipeID[0]
  };

  await db("chef_recipes").insert(newChefRecipe);
  return getChefRecipes(chefID);
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

function getRecipeById(id) {
  return db("recipes")
    .where({ id })
    .first();
}

function getChefById(chefID) {
    return db('chefs as c')
    .join('users as u', 'u.id', 'c.user_id')
    .select('u.name as chef_name', 'c.business_name')
    .where('c.id', chefID)
    .first()
}

async function getChefRecipes(chefID) {
  return db("chef_recipes as cr")
    .join("chefs as c", "c.id", "cr.chef_id")
    .join("recipes as r", "r.id", "cr.recipe_id")
    .select("cr.recipe_id", "r.title", "r.servings", "r.instructions", "r.images")
    .where("cr.chef_id", chefID);
}

async function getChefRecipesDetails(chefID) {
  const [chefObj] = await getChefById(chefID);
  console.log("chefObj: ", [chefObj]);
  const recipes = await getChefsRecipes(chefID);
  console.log("recipes: ", recipes);
  const recipe_id = recipes.length - 1;
  console.log("recipe_id", recipe_id);
  const ingredients = await getRecipeIngredients(recipe_id);
  console.log("ingredients: ", ingredients);

  const recipeDetails = {
    chef: chefObj,
    recipes: recipes
  };

  console.log(recipeDetails);
}

function getByRecipeDetail(detail) {
  console.log("detail: ", detail)
  return db('recipes').where(detail)
}
