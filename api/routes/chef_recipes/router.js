const router = require("express").Router();

const { addRecipe, getChefById, getChefsRecipes } = require("./model.js");

/**
 * @api {post} chef/:chef_id/recipes Add a Recipe
 * @apiName Add a Recipe
 * @apiGroup Chef Recipes
 *
 * @apiParam {String} title *Required* **Unique** title of recipe.
 * @apiParam {number} servings *Required* Number of people recipe serves.
 * @apiParam {String} instructions *Required* How to make the recipe.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "chef": {
 *        "chef_name": "Gordan Ramsy",
 *        "business_name": "Lucky Cat"
 *      },
 *      "recipes": [
 *        {
 *          "chef_id": 2,
 *          "recipe_id": 4,
 *          "title": "Stuffed Pork Tenderloin Recipe",
 *          "servings": 4,
 *          "instructions": "Preheat the oven to 220°C/Gas 7..."
 *        }
 *    ]
}
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

/**
 * @api {post} chef/:chef_id/recipes Add a Recipe
 * @apiName Add a Recipe
 * @apiGroup Chef Recipes
 *
 * @apiParam {String} title *Required* **Unique** title of recipe.
 * @apiParam {number} servings *Required* Number of people recipe serves.
 * @apiParam {String} instructions *Required* How to make the recipe.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "chef": {
 *        "chef_name": "Gordan Ramsy",
 *        "business_name": "Lucky Cat"
 *      },
 *      "recipes": [
 *        {
 *          "chef_id": 2,
 *          "recipe_id": 4,
 *          "title": "Stuffed Pork Tenderloin Recipe",
 *          "servings": 4,
 *          "instructions": "Preheat the oven to 220°C/Gas 7..."
 *        },
 *        {
 *          "chef_id": 2,
 *          "recipe_id": 5,
 *          "title": "Gordon's Breakfast Pizza from Scrambled",
 *          "servings": 2,
 *          "instructions": "Remove the pizza dough ball from the fridge and let it warm to room temperature..."
 *        }     
 * ]
}
 */

router.get("/:chef_id/recipes", (req, res) => {
  getChefsRecipes(req.params.chef_id)
    .then(recipes => res.status(200).json({ recipes }))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
