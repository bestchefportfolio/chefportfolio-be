const router = require("express").Router();

const { addRecipe, getChefById, getChefsRecipes } = require("./model.js");

router.post("/:chef_id/recipes/", (req, res) => {
  const chefID = req.params.chef_id;
  getChefById(chefID).then(chef => {
    addRecipe(chefID, req.body)
      .then(recipes => {
        const response = {
          chef: chef,
          recipes: recipes
        };
        res.status(201).json(response);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });
});

module.exports = router;
