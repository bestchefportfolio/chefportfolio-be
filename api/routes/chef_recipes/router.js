const router = require("express").Router();

const { addRecipe, getChefById, getChefsRecipes } = require("./model.js");

/**
 * @api {post} chef/:chef_id/recipes Add a Recipe
 * @apiName Add a Recipe
 * @apiGroup Chef Recipes
 *
 * @apiParam {String} title *Required* *Unique* title of recipe.
 * @apiParam {number} servings *Required* Number of people recipe serves.
 * @apiParam {String} instructions *Required* How to make the recipe.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      chef": {
 *          "chef_name": "New Chef",
 *          "business_name": "Resturant Passport!"
 *       }
 *      "recipes": [
 *        {
 *          "chef_id": 2,
 *          "recipe_id": 9,
 *          "title": "Best Recipe",
 *          "servings": 100,
 *          "instructions": "As many instructions as you want."
 *        }
 *      }
 *    }
 */
router.post("/:chef_id/recipes/", (req, res) => {
  const chefID = req.params.chef_id;
  getChefById(chefID).then(chef => {
    addRecipe(chefID, req.body)
      .then(recipes => {
        const response = {
          chef: chef[0],
          recipes
        };
        res.status(201).json(response);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });
});

module.exports = router;
