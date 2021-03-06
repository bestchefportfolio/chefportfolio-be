const { verify } = require("jsonwebtoken");
const { jwtSecret } = require("../../helpers/config/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    verify(token, jwtSecret, (err, decoded) => {
      if (err) res.status(401).json({ message: "Please login. 😊" });
      else {
        req.username = decoded.username;
        next();
      }
    });
  } else res.status(400).json({ message: "No token provided" });
};
