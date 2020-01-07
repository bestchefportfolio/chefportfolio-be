exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("recipes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("recipes").insert([
        { id: 1, title: "Simple Bolognese Pasta Recipe", servings: 1, instructions: "test", images: "https://files.slack.com/files-pri/T4JUEB3ME-FSCS2GMNU/sambolognese-ramen-noodles.jpg" },
        { id: 2, title: "Butter Chicken with Rice", servings: 1, instructions: "test", images: "https://files.slack.com/files-pri/T4JUEB3ME-FSF2QU4P8/butter-chicken.jpg" },
        {
          id: 3,
          title: "Mashed Potatoes with Crunchy Topping",
          servings: 1,
          instructions: "test",
          images: "https://files.slack.com/files-pri/T4JUEB3ME-FS030205Q/thanksgiving-potatoes.jpg"
        }
      ]);
    });
};
