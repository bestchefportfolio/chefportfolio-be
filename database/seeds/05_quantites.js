
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('quantites')
    .then(function () {
      // Inserts seed entries
      return knex('quantites').insert([
        {id: 1, name: 'cups'},
        {id: 2, name: 'teaspoon'},
        {id: 3, name: 'tablespoon'}
      ]);
    });
};
