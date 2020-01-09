module.exports = function validateAddIngredientRequirements(req, res, next) {
  let required = {
    ingredient_name: req.body.ingredient_name,
    quantity_id: req.body.quantity_id,
    quantity_value: req.body.quantity_value
  };
  console.log("in validation: required obj: ", required);
  switch (true) {
    case !required:
      return res.status(400).json({
        message: "You need to send a body with { ingredient_name, quantity_id, quantity_value }."
      });
    case !required.ingredient_name:
      return res.status(400).json({
        message: "A ingredient_name is required as part of the body."
      });
    case !required.quantity_id:
      return res
        .status(400)
        .json({ message: "A quantity_id is required as part of the body." });
    case !required.quantity_value:
      return res.status(400).json({
        message: "A quantity_value is required as part of the body."
      });
      break;
      // add more cases
    default:
      return next();
  }
};
