exports.up = function(knex) {
  return knex.schema.createTable("quantites", tbl => {
    tbl.increments();
    tbl.string("type_of_measurement").notNullable();
    tbl
      .string("unit")
      .unique()
      .notNullable();
    tbl
      .string("abbreviation")
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("quantites");
};
