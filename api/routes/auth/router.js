const router = require("express").Router();
const bcrypt = require("bcryptjs");

const { add, getBy, addChef } = require("./model.js");
const { generateToken } = require("../../helpers/config/generateToken.js");

// todo -- create error messages for register
/**
 * @api {post} register Register 
 * @apiName Register
 * @apiGroup Auth
 *
 * @apiParam {String} username *Required* Unique Username for the User.
 * @apiParam {String} password *Required* Password of the User.
 * @apiParam {String} email Unique Email of the User.
 * @apiParam {String} name Name of User.
 * @apiParam {boolean} is_chef Do not add, defaults to false
 *
 * @apiSuccess {String} message Thanks for joining the club!
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

/**
 * @api {post} register/chef Register Chef
 * @apiName RegisterChef
 * @apiGroup Auth
 *
 * @apiParam {String} username *Required* Unique Username for the User.
 * @apiParam {String} password *Required* Password of the User.
 * @apiParam {String} email Unique Email of the User.
 * @apiParam {String} name Name of User.
 * @apiParam {boolean} is_chef Do not add, defaults to false
 * @apiParam {String} location *Required* Location of Chef
 * @apiParam {Number} phone_number *Required* Phone Number of Chef
 * @apiParam {String} business_name *Required* Company Name Chef is employeed at
 *
 * @apiSuccess {String} message What's your favourite dish?
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "message": "What's your favourite dish?"
 *    }
 */

// todo
// add validate user middleware
// add error handling

// add a chef
router.post("/register/chef", (req, res) => {
  let newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    name: req.body.name,
    is_chef: 1
  };

  let newChef = {
    location: req.body.location,
    phone_number: req.body.phone_number,
    business_name: req.body.business_name
  };
  addChef(newUser, newChef)
    .then(() =>
      res.status(201).json({ message: "What's your favourite dish?" })
    )
    .catch(err => res.status(500).json({ error: err.message }));
});

/**
 * @api {post} login Login
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiParam {String} username Unique Username for the User.
 * @apiParam {String} password Password of the User.
 *
 * @apiSuccess {String} message Logged in <username>
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Logged in bri",
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCqwedI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VbmFtZSI6ImJyaSIsImlhdCI6MTU3ODE3NTM2MfsdfywiZXhwIjoxNTc4MTgyNTYzf.43nHMQb0mGUQg42WyqeFgrEYqweJH2PNu-cYLg1tPN1Gw0"
 *    }
 *
 *
 * @apiError {String} message invalid
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
        return res
          .status(200)
          .json({ message: `Logged in ${user.username}`, token });
      } else {
        return res.status(401).json({ message: "invalid" });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
