const router = require("express").Router();

const {
  addRecipeIngredient,
  editRecipeIngredients,
  deleteRecipeIngredients,
  getRecipeIngredients
} = require("./model.js");

// add ingredient to recipe
router.post("/:recipe_id/ingredients/:ingredient_id", (req, res) => {
  const ingredient = {
    recipe_id: Number(req.params.recipe_id),
    ingredient_id: Number(req.params.ingredient_id),
    quantity_id: req.body.quantity_id,
    quantity_value: req.body.quantity_value
  };
  console.log("ingredient: ", ingredient);
  addRecipeIngredient(ingredient)
    .then(ingredients => res.status(200).json({ ingredients }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// update recipe ingredients

// delete recipe ingredient

// get recipe ingredients
router.get("/:recipe_id/ingredients", (req, res) => {
  getRecipeIngredients(req.params.recipe_id)
    .then(ingredients => res.status(200).json(ingredients))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
