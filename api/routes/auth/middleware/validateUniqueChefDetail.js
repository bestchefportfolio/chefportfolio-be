const { getByChefDetail } = require("../model.js");

module.exports = function validateUniqueChefDetail(req, res, next) {
  const { phone_number, business_name } = req.body;

  getByChefDetail({ phone_number })
    .then(number => {
      if (number.length)
        res.status(409).json({
          message: "Phone number already exists. Please choose another. 😊"
        });
      else {
        getByChefDetail({ business_name })
          .then(biz => {
            if (biz.length)
              res.status(409).json({
                message:
                  "Business name already exists. Please choose another. 😊"
              });
            next();
          })
          .catch(err =>
            res
              .status(500)
              .json({ message: "Error validating if business name is unique." })
          );
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Error validating if phone number is unique." })
    );
};
