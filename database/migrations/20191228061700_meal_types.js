exports.up = function(knex) {
  return knex.schema.createTable("meal_types", tbl => {
    tbl
      .increments()
      .unsigned()
      .primary();
    tbl
      .string("option", 128)
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("meal_types");
};
