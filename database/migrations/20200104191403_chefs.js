exports.up = function(knex) {
  return knex.schema.createTable("chefs", tbl => {
    tbl.increments();
    tbl.string("location").notNullable();
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
