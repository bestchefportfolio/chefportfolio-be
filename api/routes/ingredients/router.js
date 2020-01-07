const router = require("express").Router();

const validateToken = require("../global-middleware/authtoken.js");

const {
  getAllIngredients,
  addIngredient,
  getQuantityType,
  addIngredientToRecipe,
  getAllMealTypes
} = require("./model.js");

/**
 * @api {get} ingredients/quantities Get All Avaliable Ingredients
 * @apiName Get ingredients
 * @apiGroup Ingredients
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *      {
 *          "ingredients": [
 *              {
 *                  "name": "almond milk"
 *              },
 *              {
 *                  "name": "dry black beans"
 *              }
 *          ]
 *      }
 */

router.get("/", validateToken, (req, res) => {
  getAllIngredients()
    .then(ingredients => res.status(200).json({ ingredients }))
    .catch(err => res.status(500).json({ error: err }));
});

/**
 * @api {get} ingredients/quantities Get All Avaliable Quantites
 * @apiName Get quantites
 * @apiGroup Ingredients
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *      {
 *       "types": [
 *         {
 *           "id": 1,
 *           "type_of_measurement": "weight",
 *           "unit": "pound",
 *           "abbreviation": "lb."
 *         },
 *         {
 *           "id": 2,
 *           "type_of_measurement": "weight",
 *           "unit": "ounce",
 *           "abbreviation": "oz."
 *         },
 *         {
 *           "id": 3,
 *           "type_of_measurement": "volume",
 *           "unit": "gallon",
 *           "abbreviation": "gal."
 *         },
 *         {
 *           "id": 4,
 *           "type_of_measurement": "volume",
 *           "unit": "quart",
 *           "abbreviation": "qt."
 *         },
 *         {
 *           "id": 5,
 *           "type_of_measurement": "volume",
 *           "unit": "pint",
 *           "abbreviation": "pt."
 *         },
 *         {
 *           "id": 6,
 *           "type_of_measurement": "volume",
 *           "unit": "cup",
 *           "abbreviation": "c."
 *         },
 *         {
 *           "id": 7,
 *           "type_of_measurement": "volume",
 *           "unit": "fluid ounce",
 *           "abbreviation": "fl. oz."
 *         },
 *         {
 *           "id": 8,
 *           "type_of_measurement": "volume",
 *           "unit": "tablespoon",
 *           "abbreviation": "tbsp."
 *         },
 *         {
 *           "id": 9,
 *           "type_of_measurement": "volume",
 *           "unit": "teaspoon",
 *           "abbreviation": "tsp"
 *         }
 *       ]
 *     }
 */

/**
 * @api {get} ingredients/meal-types Get All Avaliable Meal Types
 * @apiName Get meal types
 * @apiGroup Ingredients
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *      {
 *        "mealtypes": [
 *          {
 *            "id": 1,
 *            "type": "breakfast"
 *          },
 *          {
 *            "id": 2,
 *            "type": "lunch"
 *          },
 *          {
 *            "id": 3,
 *            "type": "dinner"
 *          },
 *          {
 *            "id": 4,
 *            "type": "appetizer"
 *          },
 *          {
 *            "id": 5,
 *            "type": "brunch"
 *          },
 *          {
 *            "id": 6,
 *            "type": "dessert"
 *          }
 *        ]
 *      }
 */

router.get("/quantities", validateToken, (req, res) => {
  getQuantityType().then(types =>
    res
      .status(200)
      .json({ types })
      .catch(err => res.status(500).json({ error: err }))
  );
});

router.get("/meal-types", validateToken, (req, res) => {
  getAllMealTypes().then(mealtypes => res.status(200).json({ mealtypes }));
});

router.post("/", validateToken, (req, res) => {
  addIngredient(req.body)
    .then(newIngredient => res.status(200).json({ newIngredient }))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
