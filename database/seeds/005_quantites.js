exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("quantites")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("quantites").insert([
        { type_of_measurement: "weight", unit: "pound", abbreviation: "lb." },
        { type_of_measurement: "weight", unit: "ounce", abbreviation: "oz." },
        { type_of_measurement: "volume", unit: "gallon", abbreviation: "gal." },
        { type_of_measurement: "volume", unit: "quart", abbreviation: "qt." },
        { type_of_measurement: "volume", unit: "pint", abbreviation: "pt." },
        { type_of_measurement: "volume", unit: "cup", abbreviation: "c." },
        {
          type_of_measurement: "volume",
          unit: "fluid ounce",
          abbreviation: "fl. oz."
        },
        {
          type_of_measurement: "volume",
          unit: "tablespoon",
          abbreviation: "tbsp."
        },
        { type_of_measurement: "volume", unit: "teaspoon", abbreviation: "tsp" }
      ]);
    });
};
