
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ingredients')
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        {id: 1, name: 'milk'},
        {id: 2, name: 'cheese'},
        {id: 3, name: 'pasta'}
      ]);
    });
};
