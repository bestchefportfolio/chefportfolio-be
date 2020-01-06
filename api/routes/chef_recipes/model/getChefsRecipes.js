const { db } = require("./index.js");

module.exports = async function getChefsRecipes(chefID) {
    return db("chef_recipes as cr")
      .join("chefs as c", "c.id", "cr.chef_id")
      .join("recipes as r", "r.id", "cr.recipe_id")
      .select("cr.recipe_id", "r.title", "r.servings", "r.instructions")
      .where("cr.chef_id", chefID);
  }