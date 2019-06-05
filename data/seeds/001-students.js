
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'BillyBob', cohort_id: 1},
        {name: 'SusieJo', cohort_id: 2},
        {name: 'TammyBeth', cohort_id: 1}
      ]);
    });
};
