const router = require("express").Router();

const {
  addRecipeIngredient,
  editRecipeIngredients,
  deleteRecipeIngredients,
  getRecipeIngredients
} = require("./model.js");

// add ingredient to recipe

/**
 * @api {post} recipes/:recipe_id/ingredients/:ingredient_id Add an Ingredient to a recipe
 * @apiName Add Recipe Ingredient
 * @apiGroup Recipes
 *
 * @apiParam {Number} recipe_id **Required** | url param to distinguish which recipe
 * @apiParam {Number} ingredient_id **Required** | url param to distinguish which ingredient
 * @apiParam {Number} quantity_id **Required** | body param to tell which quantity unit to use
 * @apiParam {Number} quantity_value **Required** | body param to tell how much of quantity unit to use
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 */

router.post("/:recipe_id/ingredients/:ingredient_id", (req, res) => {
  // add a middleware where if ingredient does not exist yet add to database
  const ingredient = {
    recipe_id: Number(req.params.recipe_id),
    ingredient_id: Number(req.params.ingredient_id),
    quantity_id: req.body.quantity_id,
    quantity_value: req.body.quantity_value
  };
  addRecipeIngredient(ingredient)
    .then(recipe_ingredients => res.status(200).json({ recipe_ingredients }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// update recipe ingredients
router.put("/:recipe_id/ingredients/:ingredient_id", (req, res) => {
  const { recipe_id, ingredient_id } = req.params;
  const updates = req.body;

  getRecipeIngredients(recipe_id)
    .then(list => {
      const ingredient = list.ingredients.filter(
        ing => ing.ingredient_id == ingredient_id
      );
      editRecipeIngredients(recipe_id, ingredient_id, updates).then(updated =>
        res.status(200).json({ updated })
      );
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// delete recipe ingredient
router.delete("/:recipe_id/ingredients/:recipe_ingredient_id", (req, res) => {
  const { recipe_id, recipe_ingredient_id } = req.params;

  deleteRecipeIngredients(recipe_id, recipe_ingredient_id)
    .then(currentRecipes => res.status(200).json({ currentRecipes }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// get recipe ingredients
router.get("/:recipe_id/ingredients", (req, res) => {
  getRecipeIngredients(req.params.recipe_id)
    .then(ingredients => res.status(200).json(ingredients))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
