const router = require("express").Router();

const { getRecipeById } = require("../chef_recipes/model.js");

const { getAllRecipes } = require("./model.js");

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

// post a recipe that includes
// { recipe, ingredients, and meal-type}

router.post("/:chef_id/recipesAll", (req, res) => {
  const { chef_id } = req.params.chef_id;

  getChefById(chef_id).then(chef => {
    addRecipe(chef_id, newRecipe)
      .then(recipes => {
        const recipe = {
          recipe: recipes[recipes.length - 1]
        };

        getIngredientByDetail({ name: ingredient_name })
          .then(ing => {
            const ingredient = {
              recipe_id: recipe.id,
              ingredient_id: ing[0].id,
              quantity_id: req.body.quantity_id,
              quantity_value: req.body.quantity_value
            };

            addRecipeIngredient(ingredient).then(recipe_ingredients => {
              getMealTypeByDetail({ type: meal_type_name }).then(tag => {
                const meal_type = {
                  recipe_id: recipe.id,
                  meal_type_id: tag[0].id
                };

                addRecipeMealType(meal_type)
                  .then(recipe_meal_type => {
                    const createdRecipe = {
                      chef: chef[0],
                      recipe,
                      recipe_meal_type,
                      recipe_ingredients
                    };

                    const allRecipes = {
                      chef: chef[0],
                      recipes
                    };

                    const response = {
                      createdRecipe: createdRecipe,
                      allRecipes: allRecipes
                    };
                    // sending response obj that we just created
                    return res.status(201).json(response);
                    /**
                     *  expect response to look like --
                     *
                     *    {
                     *      createdRecipe: {
                     *        chef: {
                     *          chef_id: 1,
                     *          chef_name: Gordan Ramsy
                     *        },
                     *        recipe: {
                     *          recipe_id: 1
                     *          title: "A name goes in here",
                     *          servings: 2,
                     *          instructions: "All instructions go here",
                     *          images: "image url here"
                     *        }
                     *        recipe_meal_type: {
                     *          recipe_meal_type_id: 1,
                     *          meal_type_id: 1,
                     *          meal_type: 'breakfast'
                     *        },
                     *        recipe_ingredient:
                     *  ALREADY NOT GOING TO WORK!!!! WE NEED TO BE ABLE TO HAVE MUTLIPLE INGREDIENTS
                     *      },
                     *      allRecipes: {
                     *        chef: {
                     *          chef_id: 1,
                     *          chef_name: Gordan Ramsy
                     *        }
                     *      }
                     *    }
                     */
                  })
                  // Error handling of adding meal type to recipe -- addRecipeMealType
                  .catch(err =>
                    res.status(500).json({
                      message: `Sorry something went wrong while trying to add ${meal_type_name} as an meal type to ${newRecipe.title}.`,
                      error: err.message
                    })
                  );
              });
            });
          })
          // Error handling of adding an ingredient to recipe -- addRecipeIngredient
          .catch(err =>
            res.status(500).json({
              message: `Sorry something went wrong while trying to add ${ingredient_name} as an ingredient to ${newRecipe.title}.`,
              error: err.message
            })
          );
      })
      // Error handling of adding a recipe -- addRecipe
      .catch(err =>
        res.status(500).json({
          message: "Error creating your new recipe",
          error: err.message
        })
      );
  });
});
module.exports = router;
