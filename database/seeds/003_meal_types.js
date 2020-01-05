exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("meal_types")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("meal_types").insert([
        { id: 1, type: "breakfast" },
        { id: 2, type: "lunch" },
        { id: 3, type: "dinner" },
        { id: 4, type: "appetizer" },
        { id: 5, type: "brunch" },
        { id: 6, type: "dessert" }
      ]);
    });
};
