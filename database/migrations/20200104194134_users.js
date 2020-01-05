exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .string("username", 128)
      .unique()
      .notNullable();
    tbl.string("password").notNullable();
    tbl.string("email").unique();
    tbl.string("name");
    tbl.integer("is_chef").defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
