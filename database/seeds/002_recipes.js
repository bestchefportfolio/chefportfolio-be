exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("recipes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("recipes").insert([
        { id: 1, title: "abc", servings: 1, instructions: "test" },
        { id: 2, title: "test", servings: 1, instructions: "test" },
        { id: 3, title: "testing", servings: 1, instructions: "test" }
      ]);
    });
};
