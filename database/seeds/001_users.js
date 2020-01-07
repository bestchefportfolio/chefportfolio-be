const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "test1",
          password: `${bcrypt.hashSync("password1234", 10)}`
        },
        {
          id: 2,
          username: "test2",
          password: `${bcrypt.hashSync("password1234", 10)}`
        },
        {
          id: 3,
          username: "misunderstoodchef86",
          password: `${bcrypt.hashSync("password1234", 10)}`,
          email: "sharpknives@gmail.com",
          name: "Gordon Ramsy"
        }
      ]);
    });
};
