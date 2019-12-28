exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("social_media_links").then(function() {
    // Inserts seed entries
    return knex("social_media_links").insert([
      { id: 1, link: "https://www.instagram.com/", user_id: 3, social_media_id: 1 },
      { id: 2, link: "https://twitter.com/", user_id: 3, social_media_id: 3 },
      { id: 3, link: "https://www.facebook.com/", user_id: 3, social_media_id: 2 }
    ]);
  });
};
