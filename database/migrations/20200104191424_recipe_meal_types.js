exports.up = function(knex) {
  return knex.schema.createTable("recipe_meal_types", tbl => {
    tbl.increments();
    tbl
      .integer("recipe_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("meal_type_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("meal_types")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipe_meal_types");
};
