exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("recipe_meal_type").then(function() {
    // Inserts seed entries
    return knex("recipe_meal_type").insert([
      { id: 1, recipe_id: 1, meal_type_id: 3 },
      { id: 2, recipe_id: 2, meal_type_id: 1 },
      { id: 3, recipe_id: 3, meal_type_id: 3 }
    ]);
  });
};
