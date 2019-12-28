exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("chefs").then(function() {
    // Inserts seed entries
    return knex("chefs").insert([
      {
        id: 1,
        location: "Wisconsin",
        phone_number: 8675309999,
        business_name: "Le Cafe du Cafe",
        user_id: 3
      }
    ]);
  });
};
