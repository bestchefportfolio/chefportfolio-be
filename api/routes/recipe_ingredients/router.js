const router = require("express").Router();

const validateToken = require("../global-middleware/authtoken.js");

const {
  addRecipeIngredient,
  editRecipeIngredients,
  deleteRecipeIngredients,
  getRecipeIngredients
} = require("./model.js");
const { getIngredientByDetail } = require("../ingredients/model.js");

const validateIngredientExists = require("../ingredients/middleware/validateIngredient.js");
const validateRecipeId = require("./middleware/validateRecipeId.js");
const validateUniqueIngredientOfRecipe = require("./middleware/validateUniqueIngredientOfRecipe.js");
const validateAddIngredientRequirements = require("./middleware/validateAddIngredientRequirements.js");
/**
 * @api {post} recipes/:recipe_id/ingredients/ Add an Ingredient to a recipe
 * @apiName Add Recipe Ingredient
 * @apiGroup Recipes
 *
 * @apiParam {Number} recipe_id **Required** | url param to distinguish which recipe
 * @apiParam {Number} ingredient_name **Required** | body param to distinguish which ingredient
 * @apiParam {Number} quantity_id **Required** | body param to tell which quantity unit to use
 * @apiParam {Number} quantity_value **Required** | body param to tell how much of quantity unit to use
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *      {
 *       "recipe_ingredients": {
 *         "recipe": {
 *           "id": 1,
 *           "title": "abc",
 *           "servings": 1,
 *           "instructions": "test",
 *           "images": null
 *         },
 *         "ingredients": [
 *           {
 *             "recipe_ingredient_id": 1,
 *             "ingredient_id": 1,
 *             "ingredient": "cheese",
 *             "quantity_value": 2,
 *             "unit_abbreviation": "oz."
 *           },
 *           {
 *             "recipe_ingredient_id": 2,
 *             "ingredient_id": 2,
 *             "ingredient": "eggs",
 *             "quantity_value": 2,
 *             "unit_abbreviation": "qt."
 *           },
 *           {
 *             "recipe_ingredient_id": 3,
 *             "ingredient_id": 3,
 *             "ingredient": "milk",
 *             "quantity_value": 4,
 *             "unit_abbreviation": "lb."
 *           }
 *         ]
 *       }
 *      }
 */

router.post(
  "/:recipe_id/ingredients/",
  validateToken,
  validateAddIngredientRequirements,
  validateRecipeId,
  validateIngredientExists,
  // validateUniqueIngredientOfRecipe,
  (req, res) => {
    /*
    add a middleware where 
      - validate recipe_id
      - validate ingredient_name here before it goes to model
      - if ingredient does not exist yet add to database --
      - all parts of body are present: { recipe_id, ingredient_id, quantity_id, quantity_value }
  */

    getIngredientByDetail({ name: req.body.ingredient_name }).then(ing => {
      console.log("params", req.params.recipe_id);
      const ingredient = {
        recipe_id: Number(req.params.recipe_id),
        ingredient_id: ing[0].id,
        quantity_id: req.body.quantity_id,
        quantity_value: req.body.quantity_value
      };
      addRecipeIngredient(ingredient)
        .then(recipe_ingredients =>
          res.status(200).json({ recipe_ingredients })
        )
        .catch(err => res.status(500).json({ error: err.message }));
    });
  }
);

/**
 * @api {put} recipes/:recipe_id/ingredients/:ingredient_id Edit an Ingredient from a recipe
 * @apiName Edit Recipe Ingredient
 * @apiGroup Recipes
 *
 * @apiParam {Number} recipe_id **Required** | url param to distinguish which recipe
 * @apiParam {Number} ingredient_id **Required** | url param to distinguish which ingredient
 * @apiParam {Number} quantity_id **Required** | body param to tell which quantity unit to use
 * @apiParam {Number} quantity_value **Required** | body param to tell how much of quantity unit to use
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *      {
 *        "updated": {
 *          "recipe": {
 *            "id": 1,
 *            "title": "abc",
 *            "servings": 1,
 *            "instructions": "test",
 *            "images": null
 *          },
 *          "ingredients": [
 *     {
 *       "recipe_ingredient_id": 1,
 *       "ingredient_id": 1,
 *       "ingredient": "cheese",
 *       "quantity_value": 2,
 *       "unit_abbreviation": "oz."
 *            }
 *          ]
 *        }
 *      }
 */

router.put(
  "/:recipe_id/ingredients/:ingredient_id",
  validateToken,
  (req, res) => {
    const { recipe_id, ingredient_id } = req.params;
    const updates = req.body;

    getRecipeIngredients(recipe_id)
      .then(list => {
        list.ingredients.filter(ing => ing.ingredient_id == ingredient_id);
        editRecipeIngredients(recipe_id, ingredient_id, updates).then(updated =>
          res.status(200).json({ updated })
        );
      })
      .catch(err => res.status(500).json({ error: err.message }));
  }
);

/**
 * @api {delete} recipes/:recipe_id/ingredients/:recipe_ingredient_id Delete an Ingredient from a recipe
 * @apiName Delete Recipe Ingredient
 * @apiGroup Recipes
 *
 * @apiParam {Number} recipe_id **Required** | url param to distinguish which recipe
 * @apiParam {Number} recipe_ingredient_id **Required** | url param to distinguish which ingredient from recipe list
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *      {
 *       "currentRecipes": {
 *         "recipe": {
 *           "id": 1,
 *           "title": "abc",
 *           "servings": 1,
 *           "instructions": "test",
 *           "images": null
 *         },
 *         "ingredients": [
 *           {
 *             "recipe_ingredient_id": 1,
 *             "ingredient_id": 1,
 *             "ingredient": "cheese",
 *             "quantity_value": 2,
 *             "unit_abbreviation": "oz."
 *           },
 *           {
 *             "recipe_ingredient_id": 2,
 *             "ingredient_id": 2,
 *             "ingredient": "eggs",
 *             "quantity_value": 2,
 *             "unit_abbreviation": "qt."
 *           }
 *         ]
 *       }
 *     }
 */

router.delete(
  "/:recipe_id/ingredients/:recipe_ingredient_id",
  validateToken,
  (req, res) => {
    const { recipe_id, recipe_ingredient_id } = req.params;

    deleteRecipeIngredients(recipe_id, recipe_ingredient_id)
      .then(currentRecipes => res.status(200).json({ currentRecipes }))
      .catch(err => res.status(500).json({ error: err.message }));
  }
);

/**
 * @api {get} recipes/:recipe_id/ingredients Gets all ingredients for a recipe
 * @apiName Get Recipe Ingredients
 * @apiGroup Recipes
 *
 * @apiParam {Number} recipe_id **Required** | url param to distinguish which recipe
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *      {
 *       "recipe": {
 *         "id": 1,
 *         "title": "abc",
 *         "servings": 1,
 *         "instructions": "test",
 *         "images": null
 *       },
 *       "ingredients": [
 *         {
 *           "recipe_ingredient_id": 1,
 *           "ingredient_id": 1,
 *           "ingredient": "cheese",
 *           "quantity_value": 2,
 *           "unit_abbreviation": "oz."
 *         },
 *         {
 *           "recipe_ingredient_id": 2,
 *           "ingredient_id": 2,
 *           "ingredient": "eggs",
 *           "quantity_value": 2,
 *           "unit_abbreviation": "qt."
 *         }
 *       ]
 *      }
 */

router.get("/:recipe_id/ingredients", (req, res) => {
  getRecipeIngredients(req.params.recipe_id)
    .then(ingredients => res.status(200).json(ingredients))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
