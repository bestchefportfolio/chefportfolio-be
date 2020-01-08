const { addIngredient, getIngredientByDetail } = require("../model.js");

module.exports = function validateIngredientExists(req, res, next) {
  const { ingredient_name } = req.body;
  getIngredientByDetail({ name: ingredient_name })
    .then(ing => {
      if (ing.length === 0) {
        addIngredient({ name: ingredient_name })
          .then(() => next())
          .catch(err =>
            res.status(500).json({
              message: `Error adding ingredient with ingredient_name: ${ingredient_name}`,
              error_message: err.message
            })
          );
      } else next();
    })
    .catch(err =>
      res.status(500).json({
        message: `Error validating ingredient with ingredient_name: ${ingredient_name}`,
        error_message: err.message
      })
    );
};
