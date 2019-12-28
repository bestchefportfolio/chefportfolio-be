exports.up = function(knex) {
  return knex.schema.createTable("chefs", tbl => {
    tbl
      .increments()
      .unsigned()
      .primary();
    tbl.string("location", 128).notNullable();
    tbl.integer("phone_number").notNullable();
    tbl.string("business_name", 128).unique();
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("chefs");
};
