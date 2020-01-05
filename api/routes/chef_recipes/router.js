const router = require("express").Router();

const {
  addRecipe,
  getChefById,
  getChefsRecipes,
  editRecipe,
  deleteRecipe
} = require("./model.js");

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
 * @api {get} chef/:chef_id/recipes Get Chef's Recipe
 * @apiName Get Recipes
 * @apiGroup Chef Recipes
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 Created
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

/**
 * @api {put} chef/:chef_id/recipes/:recipe_id Update a Recipe
 * @apiName Update
 * @apiGroup Chef Recipes
 *
 * @apiParam {String} title *Required* **Unique** title of recipe.
 * @apiParam {number} servings *Required* Number of people recipe serves.
 * @apiParam {String} instructions *Required* How to make the recipe.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 6,
 *      "title": "This was a tasty recipe!",
 *      "servings": 1,
 *      "instructions": "Nom nom nom"
 *    }
 */
router.put("/:chef_id/recipes/:recipe_id", (req, res) => {
  const { recipe_id } = req.params;
  const updates = req.body;
  editRecipe(recipe_id, updates)
    .then(changes => res.status(200).json(changes))
    .catch(err => res.status(500).json({ error: err.message }));
});

/**
 * @api {delete} chef/:chef_id/recipes/:recipe_id Delete a Recipe
 * @apiName Delete
 * @apiGroup Chef Recipes
 *
 * @apiSuccess {String} success recipe was deleted
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      success: "recipe was deleted"
 *    }
 */
router.delete("/:chef_id/recipes/:recipe_id", (req, res) => {
  const { recipe_id } = req.params;
  deleteRecipe(recipe_id)
    .then(() => res.status(200).json({ success: "recipe was deleted" }))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
