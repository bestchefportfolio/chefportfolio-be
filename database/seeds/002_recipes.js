exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("recipes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("recipes").insert([
        {
          id: 1,
          title: "Simple Bolognese Pasta Recipe",
          servings: 1,
          instructions: "test",
          images:
            "https://assets.bonappetit.com/photos/5c5d936be81bbf522a957993/16:9/w_2560%2Cc_limit/sambolognese-ramen-noodles.jpg"
        },
        {
          id: 2,
          title: "Butter Chicken with Rice",
          servings: 1,
          instructions: "test",
          images:
            "https://assets.bonappetit.com/photos/589e297b476e2c92337165bb/16:9/w_2560,c_limit/butter-chicken.jpg"
        },
        {
          id: 3,
          title: "Mashed Potatoes with Crunchy Topping",
          servings: 1,
          instructions: "test",
          images:
            "https://assets.bonappetit.com/photos/5db1d9e02348770008686203/16:9/w_2560,c_limit/Thanksgiving-Potatoes.jpg"
        }
      ]);
    });
};
