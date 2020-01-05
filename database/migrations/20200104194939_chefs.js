exports.up = function(knex) {
  return knex.schema.createTable("chefs", tbl => {
    tbl.increments();
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("location").notNullable();
    tbl
      .string("phone_number")
      .unique()
      .notNullable();
    tbl.string("business_name").unique().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("chefs");
};
