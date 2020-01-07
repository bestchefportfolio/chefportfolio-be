const { getAllIngredients, addIngredient } = require("../model.js");

module.exports = function validateIngredient(req, res, next) {
  const { ingredient_id } = req.params;

  getAllIngredients().then(list => {
    list.ingredients
      .filter(ing => {
        if (ing.ingredient_id === ingredient_id) {
          next();
        } else {
          addIngredient()
            .then(success =>
              res.status(201).json({ message: "created new ingredient." })
            )
            .catch(err =>
              res.status(500).json({
                message: "Error adding new ingredient.",
                error_message: err.error_message
              })
            );
        }
      })
      .catch(err =>
        res.status(500).json({
          message: `Error validating ingredient with ingredient_id: ${ingredient_id}`,
          error_message: err.message
        })
      );
  });
};
