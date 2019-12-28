
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'admin', password: 'password', email: 'admin@gmail.com', name: 'admin', is_chef: 0},
        {id: 2, username: 'user', password: 'password', email: 'user@gmail.com', name: 'user', is_chef: 0},
        {id: 3, username: 'chef', password: 'password', email: 'chef@gmail.com', name: 'chef', is_chef: 1}
      ]);
    });
};
