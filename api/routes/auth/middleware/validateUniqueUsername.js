const { getByUsername } = require("../model.js");

module.exports = function validateUniqueUsername(req, res, next) {
  const { username } = req.body;

  console.log("username: ", username);

  getByUsername(username)
    .then(user => {
      console.log("user: ", user);
      if (user.length)
        res.status(409).json({
          message: "Username already exists. Please choose another. 😊"
        });
      else next();
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Error validating if username is unique." })
    );
};
