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
        },
        {
          title: "Black Bean Breakfast Bowl",
          servings: 1,
          instructions: "1. Heat olive oil in a small pan over medium heat. Cook and stir eggs until eggs are set, 3 to 5 minutes. 2. Place black beans in a microwave-safe bowl. Heat on High in the microwave until warm, about 1 minute. 3.Divide warmed black beans between two bowls. 4.Top each bowl with scrambled eggs, avocado, and salsa. Season with salt and black pepper.",
        },
        {
          title: "Breaded, Fried, Softly Spiced Tofu",
          servings: 1,
          instructions: "1. Cut pressed tofu into 1/2-inch thick slices; then cut again into 1/2-inch wide sticks. Place tofu in a bowl, and pour broth over the top. Set aside to soak. 2. In a separate bowl, stir together flour, yeast, salt, pepper, sage, and cayenne. 3. Warm oil in a large skillet over medium-high heat. 4. Remove tofu sticks from broth, and squeeze most (but not all) of the liquid from them. Roll sticks in breading. (You may have to roll sticks twice to end up with a fairly dry outer layer of breading.) Place tofu in hot oil; fry until crisp and browned on all sides. Add more oil if necessary.",
        }
      ]);
    });
};
