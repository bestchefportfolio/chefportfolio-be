const router = require("express").Router();
const bcrypt = require("bcryptjs");

const { add, getBy } = require("./model.js");
const { generateToken } = require("../../helpers/config/generateToken.js");

// todo -- create error messages for register
/**
 * @api {post} /register
 * @apiName Register
 * @apiGroup Auth
 * 
 * @apiParam {String} username Unique Username for the User.
 * @apiParam {String} password Password of the User.
 * 
 * @apiSuccess {String} Thanks for joining the club!
 * 
 * @apiSuccessExample Success-Response: 
 *    HTTP/1.1 201 Created
 *    {
 *      "message": "Thanks for joining the club!"
 *    }
 */
router.post("/register", (req, res) => {
  let newUser = req.body;
  newUser.password = bcrypt.hashSync(newUser.password, 10);
  add(newUser)
    .then(() =>
      res.status(201).json({ message: "Thanks for joining the club!" })
    )
    .catch(err => res.status(500).json({ error: "Cannot add new user.", err }));
});

// create chef register post request

/**
 * @api {post} /login Login 
 * @apiName Login
 * @apiGroup Auth
 * 
 * @apiParam {String} username Unique Username for the User.
 * @apiParam {String} password Password of the User.
 * 
 * @apiSuccess {String} Logged in bri
 * 
 * @apiSuccessExample Success-Response: 
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Logged in bri",
 *      "token":
 *      "eyJhbGciOiJIUzI1NiIsInR5cCqwedI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2V
 *      bmFtZSI6ImJyaSIsImlhdCI6MTU3ODE3NTM2MfsdfywiZXhwIjoxNTc4MTgyNTYzf
 *      .43nHMQb0mGUQg42WyqeFgrEYqweJH2PNu-cYLg1tPN1Gw0"
 *    }
 * 
 * 
 * @apiError Invalid Credentials invalid
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "message": "invalid"
 *    }
 */

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
