const router = require("express").Router();

const {
  getAllIngredients,
  addIngredient,
  getQuantityType,
  addIngredientToRecipe
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
 *              }
 *          ]
 *      }
 */

router.get("/", (req, res) => {
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

router.get("/quantities", (req, res) => {
  getQuantityType().then(types =>
    res
      .status(200)
      .json({ types })
      .catch(err => res.status(500).json({ error: err }))
  );
});

router.post("/:ingredient_id/", (req, res) => {
  return null;
});

module.exports = router;
