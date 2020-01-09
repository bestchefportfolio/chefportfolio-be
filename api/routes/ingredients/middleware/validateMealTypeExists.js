const { getMealTypeByDetail, addMealType } = require("../model.js");

module.exports = function validateMealTypeExists(req, res, next) {
  const { meal_type_name } = req.body;
  getMealTypeByDetail({ type: meal_type_name })
    .then(meal_type => {
      if (meal_type.length === 0) {
        addMealType({ type: meal_type_name })
          .then(() => next())
          .catch(err =>
            res.status(500).json({
              message: `Error adding meal type with meal_type_name: ${meal_type_name}`,
              error_message: err.message
            })
          );
      } else next();
    })
    .catch(err =>
      res.status(500).json({
        message: `Error validating meal type with meal_type_name ${meal_type_name}`,
        error_message: err.message
      })
    );
};
