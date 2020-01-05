const router = require("express").Router();

const { getRecipeById } = require("../chef_recipes/model.js");

const { getAllRecipes } = require("./model.js");

router.get("/:recipe_id", (req, res) => {
  getRecipeById(req.params.recipe_id)
    .then(recipe => res.status(200).json({ recipe }))
    .catch(err => res.status(500).json({ error: err }));
});

router.get("/", (req, res) => {
  getAllRecipes()
    .then(all_recipes => res.status(200).json({ all_recipes }))
    .catch(err => res.status(500).json({ error: err }));
});
module.exports = router;
