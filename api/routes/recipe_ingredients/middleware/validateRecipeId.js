const { getById } = require("../../recipes/model.js");

module.exports = function validateRecipeId(req, res, next) {
  const { recipe_id } = req.params;

  getById({ id: recipe_id })
    .then(recipe => {
      if (!recipe.length)
        res.status(409).json({
          message: `Recipe with the id: ${recipe_id} could not be found`
        });
      else next();
    })
    .catch(err =>
      res.status(500).json({
        error: `Error validating recipe with the id: ${recipe_id}.`,
        err
      })
    );
};
