const { verify } = require("jsonwebtoken");
const { jwtSecret } = require("../../helpers/config/secrets.js");

module.exports = (req, res, next) => {
  const token = req.header.authorization;

  if (token) {
    verify(token, jwtSecret, (err, decoded) => {
      if (err) res.status(401).json({ message: "False" });
      else {
        req.username = decoded.username;
        next();
      }
    });
  } else res.status(400).json({ message: "No token provided" });
};
