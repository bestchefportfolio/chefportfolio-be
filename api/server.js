const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// local imports
const authRouter = require("./routes/auth/router.js");
const chefRecipesRouter = require("./routes/chef_recipes/router.js");
const ingredientsRouter = require("./routes/ingredients/router.js");
const recipesRouter = require("./routes/recipes/router.js");
const recipeIngredientsRouter = require("./routes/recipe_ingredients/router.js");

const server = express();
server.use(cors());
server.use(helmet());
server.use(express.json());

// routes
server.use("/docs", express.static("./docs"));
server.use("/", authRouter);
server.use("/chef", chefRecipesRouter);
server.use("/ingredients", ingredientsRouter);
server.use("/recipes", recipesRouter, recipeIngredientsRouter);

/**
 * @api {get} / Test Endpoint to be sure the server is up and running.
 *
 * @apiSuccess {String} <h1>The server is up and running! <3 😊</h1>
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 */

// test end point
server.get("/", (req, res) =>
  res.status(200).send("<h1>The server is up and running! <3 😊</h1>")
);

module.exports = server;
