const { getByUserDetail } = require("../model.js");

module.exports = function validateUserID(req, res, next) {
  const { user_id } = req.params;

  getByUserDetail({ id: user_id })
    .then(user => {
      if (user.length === 0)
        res.status(409).json({
          message: `User with id: ${user_id} already does not exist`
        });
      else next();
    })
    .catch(err =>
      res.status(500).json({
        message: "Error validating that user already exists",
        error: err.message
      })
    );
};
