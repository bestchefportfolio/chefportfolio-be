exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("recipe_instructions").then(function() {
    // Inserts seed entries
    return knex("recipe_instructions").insert([
      { id: 1, content: "1. Preheat oven to 350. 2. Add milk cheese and pasta to pan. 3. Stir 4. Add pan to oven. 5. Bake for 45 min or until golden brown.", recipe_id: 2 },
      { id: 2, content: "1. Preheat oven to 350. 2. Add milk cheese and pasta to pan. 3. Stir 4. Add pan to oven. 5. Bake for 45 min or until golden brown.", recipe_id: 3 },
      { id: 3, content: "1. Preheat oven to 350. 2. Add milk cheese and pasta to pan. 3. Stir 4. Add pan to oven. 5. Bake for 45 min or until golden brown.", recipe_id: 1 }
    ]);
  });
};
