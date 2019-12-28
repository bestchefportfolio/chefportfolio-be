
exports.up = function(knex) {
  return knex.schema.createTable('chef_recipes', tbl => {
      tbl.increments().unsigned().primary();
      tbl
      .integer("recipe_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
      tbl
      .integer("chef_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("chefs")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('chef_recipes')
};
