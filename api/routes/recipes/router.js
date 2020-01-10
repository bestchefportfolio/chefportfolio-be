const router = require("express").Router();

const { getRecipeById } = require("../chef_recipes/model.js");

const { getAllRecipes, getAllRecipeData } = require("./model.js");

/**
 * @api {get} recipes/:recipe_id Search for recipe
 * @apiName Get Recipe By Id
 * @apiGroup Recipes
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *      {
 *        "recipe": {
 *          "id": 2,
 *          "title": "test",
 *          "servings": 1,
 *          "instructions": "test",
 *         "images": null
 *       }
 *      }
 */

router.get("/:recipe_id", (req, res) => {
  getRecipeById(req.params.recipe_id)
    .then(recipe => res.status(200).json({ recipe }))
    .catch(err => res.status(500).json({ error: err }));
});


/**
 * @api {get} recipes/ List All Recipes
 * @apiName Get All Recipes
 * @apiGroup Recipes
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *      {
 *       "all_recipes": [
 *         {
 *           "id": 1,
 *           "title": "abc",
 *           "servings": 1,
 *           "instructions": "test",
 *           "images": null
 *         },
 *         {
 *           "id": 2,
 *           "title": "test",
 *           "servings": 1,
 *           "instructions": "test",
 *           "images": null
 *         },
 *         {
 *           "id": 3,
 *           "title": "testing",
 *           "servings": 1,
 *           "instructions": "test",
 *           "images": null
 *         }
 *       ]
 *      }
 */

router.get("/", (req, res) => {
  getAllRecipes()
    .then(all_recipes => res.status(200).json({ all_recipes }))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
