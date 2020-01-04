exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl
      .increments()
      .unsigned()
      .primary();   
    tbl
      .string("username", 128)
      .unique()
      .notNullable();
    tbl.string("password", 128).notNullable();
    tbl.string("email", 128).unique();
    tbl.string("name", 128);
    tbl.integer("is_chef").defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
