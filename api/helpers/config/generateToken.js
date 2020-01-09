const { sign } = require("jsonwebtoken");
const { jwtSecret } = require("./secrets.js");

module.exports = {
  generateToken
};

function generateToken({ id, username }) {
  // config for payload part of token
  const payload = {
    id: id,
    username: username,
  };
  const options = {
    expiresIn: "8h"
  };

  // signiture of token
  return sign(payload, jwtSecret, options);
}
