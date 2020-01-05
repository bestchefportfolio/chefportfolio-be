exports.up = function(knex) {
  return knex.schema.createTable("chefs", tbl => {
    tbl.increments();
    tbl.string("location").notNullable();
    tbl
    .integer("user_id")
    .unsigned()
    .notNullable()
    .references("id")
    .inTable("users")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
    tbl
      .string("phone_number")
      .unique()
      .notNullable();
    tbl.string("business_name").unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("chefs");
};
