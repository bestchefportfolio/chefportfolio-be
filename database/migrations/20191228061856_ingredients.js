exports.up = function(knex) {
  return knex.schema.createTable("ingredients", tbl => {
    tbl
      .increments()
      .unsigned()
      .primary();
    tbl
      .string("name", 128)
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("ingredients");
};
