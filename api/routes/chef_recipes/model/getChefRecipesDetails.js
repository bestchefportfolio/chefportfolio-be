const { db } = require("./index.js");
const { getChefById, getChefsRecipes, getRecipeIngredients } = require('./index.js')

module.exports = async function getChefRecipesDetails (chefID) {
    const [chefObj] = await getChefById(chefID)
    console.log("chefObj: ", [chefObj])
    const recipes = await getChefsRecipes(chefID)
    console.log("recipes: ", recipes)
    const recipe_id = recipes.length -1
    console.log("recipe_id", recipe_id)
    const ingredients = await getRecipeIngredients(recipe_id)
    console.log("ingredients: ", ingredients)
  
    const recipeDetails = {
      chef: chefObj,
      recipes:recipes,
    }
  
    console.log(recipeDetails)
  }