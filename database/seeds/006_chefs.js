exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("chefs")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("chefs").insert([
        {
          id: 1,
          user_id: 3,
          location: "wisconsin",
          phone_number: "867-530-9999",
          business_name: "Hamburger Mary's"
        }
      ]);
    });
};
