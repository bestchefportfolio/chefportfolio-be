exports.up = function(knex) {
  return knex.schema.createTable("social_media", tbl => {
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
  return knex.schema.dropTableIfExists("social_media");
};
