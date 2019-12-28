
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('social_media')
    .then(function () {
      // Inserts seed entries
      return knex('social_media').insert([
        {id: 1, name: 'instagram'},
        {id: 2, name: 'facebook'},
        {id: 3, name: 'twitter'}
      ]);
    });
};
