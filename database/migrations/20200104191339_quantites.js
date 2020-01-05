exports.up = function(knex) {
  return knex.schema.createTable("quantites", tbl => {
    tbl.increments();
    tbl
      .string("name")
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("quantites");
};
