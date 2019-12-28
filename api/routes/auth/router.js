const router = require("express").Router();
const bcrypt = require("bcryptjs");

const { add, getBy } = require("./model.js");
const { generateToken } = require("../../helpers/config/generateToken.js");

router.post("/register", (req, res) => {
  let newUser = req.body;
  newUser.password = bcrypt.hashSync(newUser.password, 10);
  add(newUser)
    .then(() =>
      res.status(201).json({ message: "Thanks for joining the club!" })
    )
    .catch(err => res.status(500).json({ error: "Cannot add new user.", err }));
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  getBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
       return res.status(200).json({ message: `Logged in ${user.username}`, token });
      } else {
        return res.status(401).json({ message: "invalid" });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
