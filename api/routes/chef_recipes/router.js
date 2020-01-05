const router = require("express").Router();

const { addRecipe, getChefsRecipes } = require("./model.js.js");

router.post("/:id/recipes/", (req, res) => {
  addRecipe(req.body)
    .then(() => res.status(201))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
