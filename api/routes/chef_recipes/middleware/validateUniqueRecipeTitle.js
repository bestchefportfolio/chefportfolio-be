const { getByRecipeDetail } = require("../model.js");

module.exports = function validateUniqueRecipeTitle(req, res, next) {
  const { title } = req.body;
  console.log("title: ", title);

  getByRecipeDetail({ title })
    .then(recipe => {
      console.log("recipe: ", recipe);
      if (recipe.length)
        res.status(409).json({
          message:
            "There is already a recipe with that title. Please choose another title."
        });
      else next();
    })
    .catch(err =>
      res.status(500).json({
        message: "Error validating if recipe title is unique."
      })
    );
};
