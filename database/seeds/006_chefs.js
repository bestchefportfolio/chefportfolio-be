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
          location: "England",
          phone_number: "867-530-9999",
          business_name: "Lucky Cat"
        },
        {
          id: 2,
          user_id: 1,
          location: "Canada",
          phone_number: "8675003099",
          business_name: "Foodie Fun"
        }
      ]);
    });
};
