
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('meal_types')
    .then(function () {
      // Inserts seed entries
      return knex('meal_types').insert([
        {id: 1, option: 'breakfast'},
        {id: 2, option: 'lunch'},
        {id: 3, option: 'dinner'}
      ]);
    });
};
