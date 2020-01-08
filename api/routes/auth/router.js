const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../helpers/config/generateToken.js");

const {
  add,
  getBy,
  addChef,
  editUser,
  deleteUser,
  editChef,
  deleteChef,
  getAllUsernames,
  getByUserDetail
} = require("./model.js");

const validateUniqueUserDetail = require("./middleware/validateUniqueUserDetail.js");
const validateUniqueChefDetail = require("./middleware/validateUniqueChefDetail.js");
const validateUserID = require("./middleware/validateUserID.js");
const validateToken = require("../global-middleware/authtoken.js");

// todo -- create error messages for register
/**
 * @api {post} register Register
 * @apiName Register
 * @apiGroup Auth
 *
 * @apiParam {String} username **Required** | *Unique* | Username for the User.
 * @apiParam {String} password **Required** | Password of the User.
 * @apiParam {String} email *Unique* | Email of the User.
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
router.post("/register", validateUniqueUserDetail, (req, res) => {
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
 * @apiParam {String} username **Required** | *Unique* | Username for the User.
 * @apiParam {String} password **Required** | Password of the User.
 * @apiParam {String} email *Unique* | Email of the User.
 * @apiParam {String} name Name of User.
 * @apiParam {boolean} is_chef Do not add, defaults to true
 * @apiParam {String} location **Required** | Location of Chef
 * @apiParam {Number} phone_number **Required** | Phone Number of Chef
 * @apiParam {String} business_name **Required** | Company Name Chef is employeed at
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
router.post(
  "/register/chef",
  validateUniqueUserDetail,
  validateUniqueChefDetail,
  (req, res) => {
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
  }
);

/**
 * @api {post} login Login
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiParam {String} username **Required** | *Unique* | Username for the User.
 * @apiParam {String} password **Required** | Password of the User.
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
  let { username, password } = req.body;
  // console.log("username: ", username, `\n password: `, password);

  getByUserDetail({ username })
    .first()
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
    .catch(err => res.status(500).json({ error: err.message }));
});

/**
 * @api {put} user/:user_id/update Update User Info
 * @apiName Update User
 * @apiGroup Auth
 *
 * @apiParam {String} username **Required** | *Unique* | Username for the User.
 * @apiParam {String} password **Required** | Password of the User.
 * @apiParam {String} email *Unique* | Email of the User.
 * @apiParam {String} name Name of User.
 *
 * @apiSuccess {Object} updatedUser Shows everything but password to render for user
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *     {
 *       "updatedUser": {
 *         "id": 1,
 *         "username": "admins",
 *         "email": "bananas@gmail.com",
 *         "name": "adminchef"
 *        }
 *     }
 */

router.put(
  "/user/:user_id/update",
  validateToken,
  validateUniqueUserDetail,
  (req, res) => {
    editUser(req.params.user_id, req.body)
      .then(updatedUser => res.status(200).json({ updatedUser }))
      .catch(err => res.status(500).json({ error: err.message }));
  }
);

/**
 * @api {delete} user/:user_id/update Delete User Info
 * @apiName Delete User
 * @apiGroup Auth
 *
 * @apiParam {Number} user_id **Required** | *Unique* | Id of User.
 *
 * @apiSuccess {String} success sucessfully deleted user
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *      {
 *        "success": "successfully deleted user"
 *      }
 */

router.delete(
  "/user/:user_id/delete",
  validateToken,
  validateUserID,
  (req, res) => {
    deleteUser(req.params.user_id, req.body)
      .then(() =>
        res.status(200).json({ success: "successfully deleted user" })
      )
      .catch(err => res.status(500).json({ error: err.message }, err));
  }
);

// if I get to it adding these would be awesome!!!

// router.put("/chef/:chef_id/update", (req, res) => {
//   editChef(req.params.chef_id, req.body)
//     .then(updatedChef => res.status(200).json({ updatedChef }))
//     .catch(err => res.status(500).json({ error: err.message }));
// });

// router.delete("/chef/:chef_id/delete", (req, res) => {
//   deleteChef(req.params.chef_id, req.body)
//     .then(() => res.status(200).json({ success: "successfully deleted chef" }))
//     .catch(err => res.status(500).json({ error: err.message }));
// });

/**
 * @api {get} allusernames Get All Users by username and name
 * @apiName Users
 * @apiGroup Users/Chefs
 *
 * @apiSuccess {Object} users Object that contains User's username and name.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "users": [
 *        {
 *          "username": "admin",
 *          "name": "BestChefAdmin"
 *        },
 *        {
 *          "username": "blubsbunny",
 *          "name": null
 *        },
 *        {
 *          "username": "misunderstoodchef86",
 *          "name": "Gordan Ramsy"
 *        }
 *      ]
 *    }
 */

router.get("/allusernames", (req, res) => {
  getAllUsernames()
    .then(users => res.status(200).json({ users }))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
