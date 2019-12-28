exports.up = function(knex) {
  return knex.schema.createTable("recipes", tbl => {
    tbl
      .increments()
      .unsigned()
      .primary();
    tbl
      .string("title", 128)
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipes");
};
