const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users").then(function() {
    // Inserts seed entries
    return knex("users").insert([
      {
        id: 1,
        username: "admin",
        password: `${bcrypt.hashSync("password1234", 10)}`,
        email: "admin@gmail.com",
        name: "admin",
        is_chef: 0
      },
      {
        id: 2,
        username: "user",
        password: `${bcrypt.hashSync("password1234", 10)}`,
        email: "user@gmail.com",
        name: "user",
        is_chef: 0
      },
      {
        id: 3,
        username: "chef",
        password: `${bcrypt.hashSync("password1234", 10)}`,
        email: "chef@gmail.com",
        name: "chef",
        is_chef: 1
      }
    ]);
  });
};
