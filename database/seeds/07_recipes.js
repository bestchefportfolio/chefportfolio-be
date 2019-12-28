
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes')
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {id: 1, title: 'Mac and Cheese'},
        {id: 2, title: 'Savory Cake'},
        {id: 3, title: 'Alfredo'}
      ]);
    });
};
