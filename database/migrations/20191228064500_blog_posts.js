exports.up = function(knex) {
  return knex.schema.createTable("blog_posts", tbl => {
    tbl
      .increments()
      .unsigned()
      .primary();
    tbl
      .string("title", 128)
      .unique()
      .notNullable();
    tbl
      .text("content")
      .unique()
      .notNullable();
    tbl
      .integer("recipe_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("blog_posts");
};
