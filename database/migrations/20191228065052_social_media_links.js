
exports.up = function(knex) {
  return knex.schema.createTable('social_media_links', tbl => {
      tbl.increments().unsigned().primary()
      tbl.string('link').unique().notNullable()
      tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
      tbl
      .integer("social_media_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("social_media")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('social_media_links')
};
