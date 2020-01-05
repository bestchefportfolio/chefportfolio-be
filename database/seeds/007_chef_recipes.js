exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("chef_recipes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("chef_recipes").insert([
        { id: 1, recipe_id: 1, chef_id: 1 },
        { id: 2, recipe_id: 2, chef_id: 1 },
        { id: 3, recipe_id: 3, chef_id: 1 }
      ]);
    });
};
