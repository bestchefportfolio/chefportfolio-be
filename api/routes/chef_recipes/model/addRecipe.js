const { getChefsRecipes } = require("./index.js");
const { db } = require("./index.js");

module.exports = async function addRecipe(chefID, recipe) {
  const recipeID = await db("recipes").insert(recipe, "id");

  const newChefRecipe = {
    chef_id: chefID,
    recipe_id: recipeID[0]
  };

  await db("chef_recipes").insert(newChefRecipe);
  return getChefsRecipes(chefID);
};
