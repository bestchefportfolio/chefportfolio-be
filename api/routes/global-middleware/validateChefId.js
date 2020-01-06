const { getByChefDetail } = require("../auth/model.js");
module.exports = function validateChefId(req, res, next) {
  const { chef_id } = req.params;
  console.log("chef_id:", chef_id);

  getByChefDetail({ id: chef_id })
    .then(chef => {
      if (chef.length === 0)
        res.status(409).json({
          message: `Chef with id: ${chef_id} does not exists`
        });
      else next();
    })
    .catch(err =>
      res.status(500).json({
        message: `Error validating if chef with id: ${chef_id} exists`
      })
    );
};
