module.exports = function validateAddIngredientRequirements(req, res, next) {
  const required = {
    recipe_id: req.params.recipe_id,
    ingredient_name: req.body.ingredient_name,
    quantity_id: req.body.quantity_id,
    quantity_value: req.body.quantity_value
  };

  switch (required) {
    case !require.recipe_id:
      return res
        .status(400)
        .json({ message: "A recipe_id is required as part of the body." });
    case !require.ingredient_name:
      return res.status(400).json({
        message: "A ingredient_name is required as part of the body."
      });
    case !require.quantity_id:
      return res
        .status(400)
        .json({ message: "A quantity_id is required as part of the body." });
    case !require.quantity_value:
      return res
        .status(400)
        .json({ message: "A quantity_value is required as part of the body." });
    default:
      return next();
  }
};
