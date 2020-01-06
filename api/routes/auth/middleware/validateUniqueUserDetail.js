const { getByUserDetail } = require("../model.js");

module.exports = function validateUniqueUsername(req, res, next) {
  const { username, email } = req.body;

  getByUserDetail({ username })
    .then(user => {
      if (user.length)
        res.status(409).json({
          message: "Username already exists. Please choose another. 😊"
        });
      else {
        getByUserDetail({ email })
          .then(em => {
            if (em.length)
              res.status(409).json({
                message: "Email already exists. Please choose another. 😊"
              });
            next();
          })
          .catch(err =>
            res
              .status(500)
              .json({ message: "Error validating if email is unique." })
          );
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Error validating if username is unique." })
    );
};
