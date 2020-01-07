exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "test1", password: "p" },
        { id: 2, username: "test2", password: "p" },
        {
          id: 3,
          username: "misunderstoodchef86",
          password: "p",
          email: "sharpknives@gmail.com",
          name: "Gordon Ramsy"
        }
      ]);
    });
};
