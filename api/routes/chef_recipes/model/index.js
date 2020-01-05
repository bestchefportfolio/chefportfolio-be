const { db } = require("../../../../database/dbconfig.js");

const { addRecipe } = require("./addRecipe.js");
const { deleteRecipe } = require("./deleteRecipe.js");
const { editRecipe } = require("./editRecipe.js");
const getChefById = require("./getChefByID");
const { getChefRecipesDetails } = require("./getChefRecipesDetails");
const { getChefsRecipes } = require("./getChefsRecipes");

module.exports = {
  addRecipe,
  deleteRecipe,
  editRecipe,
  getChefById,
  getChefRecipesDetails,
  getChefsRecipes
};
