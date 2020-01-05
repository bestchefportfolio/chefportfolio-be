exports.up = function(knex) {
  return knex.schema.createTable("recipes", tbl => {
    tbl.increments();
    tbl
      .string("title")
      .unique()
      .notNullable();
    tbl.integer("servings").notNullable();
    tbl.text("instructions").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipes");
};