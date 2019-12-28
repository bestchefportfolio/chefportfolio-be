exports.up = function(knex) {
  return knex.schema.createTable("recipe_instructions", tbl => {
    tbl
      .increments()
      .unsigned()
      .primary();
    tbl.text("content").notNullable();
    tbl
      .integer("recipe_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('recipe_instructions')
};
