exports.up = function(knex) {
  return knex.schema.createTable("recipes", tbl => {
    tbl.increments();
    tbl
      .string("title")
      .unique()
      .notNullable();
    tbl.integer("servings").notNullable();
    tbl.text("instructions").notNullable();
    tbl.text('images').defaultTo('https://source.unsplash.com/collection/239835/500x500')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipes");
};
