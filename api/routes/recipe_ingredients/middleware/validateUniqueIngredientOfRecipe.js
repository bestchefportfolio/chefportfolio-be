const { getRecipeIngredients } = require("../model.js");

module.exports = function validateUniqueIngredientOfRecipe(req, res, next) {
  /**
   *  get recipe ingredients
   *  filter out by ingredient name
   *  if arr comes back empty next
   */
  const recipe_id = req.params.recipe_id;
  console.log(recipe_id);
  const { ingredient_name } = req.body;
  console.log(ingredient_name);

  getRecipeIngredients(recipe_id)
    .then(ingredientsArr => {
      console.log("ingredients arrr: ", ingredientsArr);
      ingredientsArr.ingredients.filter(ing => {
        console.log("ing: ", ing);
        console.log("ingredient_name: ", ingredient_name);
        if (ing.ingredient === ingredient_name) {
          return res.status(409).json({
            message: `Sorry. This recipe already has ${ingredient_name}. Would you like to edit that ingredient?`
          });
        } else next();
      });
    })
    .catch(err =>
      res.status(500).json({
        message: "Error validating if ingredient is unique in recipe",
        err
      })
    );
};
