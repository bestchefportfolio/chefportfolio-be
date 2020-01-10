const router = require("express").Router();
const validateToken = require("../global-middleware/authtoken.js");

const {
  addRecipe,
  editRecipe,
  deleteRecipe,
  getRecipeById,
  getChefById,
  getChefRecipes,
  getChefRecipesDetails
} = require("./model");

const { getByUserDetail } = require("../auth/model.js");

const validateChefId = require("../global-middleware/validateChefId.js");
const validateUniqueRecipeTitle = require("./middleware/validateUniqueRecipeTitle.js");

/**
 * @api {post} chef/:chef_id/recipes Add a Recipe
 * @apiName Add a Recipe
 * @apiGroup Chef Recipes
 *
 * @apiParam {String} title **Required** | *Unique* | title of recipe.
 * @apiParam {number} servings **Required** | Number of people recipe serves.
 * @apiParam {String} instructions **Required** | How to make the recipe.
 * @apiParam {String} images An image to attach to recipe.
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
 *          "recipe_id": 4,
 *          "title": "Stuffed Pork Tenderloin Recipe",
 *          "servings": 4,
 *          "instructions": "Preheat the oven to 220°C/Gas 7..."
 *          "images": null
 *        }
 *    ]
}
 */
router.post(
  "/:chef_id/recipes",
  // validateToken,
  // validateChefId,
  // validateUniqueRecipeTitle,
  (req, res) => {
    console.log("body: ", req.body);
    console.log("params", req.params.chef_id);
    const chefID = req.params.chef_id;
    const bodyObj = {
      title: req.body.title,
      servings: Number(req.body.servings),
      instructions: req.body.instructions,
      images: req.body.images || null
    };
    console.log(bodyObj);
    getChefById(chefID).then(chef => {
      addRecipe(chefID, bodyObj)
        .then(recipes => {
          const response = {
            chef: chef[0],
            recipes
          };
          res.status(201).json(response);
        })
        .catch(err => {
          console.log("err: ", err);
          res.status(500).json({ message: "Error in ", error: err.message });
        });
    });
  }
);

/**
 * @api {get} chef/:chef_id/recipes Get Chef's Recipe
 * @apiName Get Recipes
 * @apiGroup Chef Recipes
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
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
 *          "images": null
 *        },
 *        {
 *          "chef_id": 2,
 *          "recipe_id": 5,
 *          "title": "Gordon's Breakfast Pizza from Scrambled",
 *          "servings": 2,
 *          "instructions": "Remove the pizza dough ball from the fridge and let it warm to room temperature..."
 *          "images": null
 *         }     
 * ]
}
 */

router.get("/:chef_id/recipes", (req, res) => {
  getChefById(req.params.chef_id).then(chef => {
    getChefRecipes(req.params.chef_id)
      .then(chefRecipes => {
        res.status(200).json({ chef, chefRecipes });
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });
});

/**
 * @api {put} chef/:chef_id/recipes/:recipe_id Update a Recipe
 * @apiName Update
 * @apiGroup Chef Recipes
 *
 * @apiParam {String} title **Required** | *Unique* | title of recipe.
 * @apiParam {number} servings **Required** | Number of people recipe serves.
 * @apiParam {String} instructions **Required** | How to make the recipe.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 6,
 *      "title": "This was a tasty recipe!",
 *      "servings": 1,
 *      "instructions": "Nom nom nom",
 *      "images": null
 *    }
 */
router.put("/:chef_id/recipes/:recipe_id", validateToken, (req, res) => {
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
router.delete(
  "/:chef_id/recipes/:recipe_id",
  validateToken,
  validateChefId,
  (req, res) => {
    const { recipe_id } = req.params;
    deleteRecipe(recipe_id)
      .then(() => res.status(200).json({ success: "recipe was deleted" }))
      .catch(err => res.status(500).json(err));
  }
);

module.exports = router;
