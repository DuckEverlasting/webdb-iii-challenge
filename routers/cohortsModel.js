const db = require('../data/dbConfig.js');

module.exports = {
  add,
  get,
  getById,
  getStudentsByCohort,
  update,
  remove
}

function add(cohort) {
  return db('cohorts')
    .insert(cohort)
    .then(ids => {
      [id] = ids;
      return getById(id);
    });
}

function get() {
  return db('cohorts')
}

function getById(id) {
  return db('cohorts')
    .where('id', id)
    .first();
}

function getStudentsByCohort(id) {
  return db('cohorts')
    .join('students', 'students.cohort_id', 'cohorts.id')
    .select('students.name', 'students.cohort_id')
    .where('cohorts.id', id);
}

function update(id, changes) {
  return db('cohorts')
    .where('id', id)
    .update(changes)
    .then(cohort => {
      if(cohort > 0) {
        return getById(id);
      } else {
        return null;
      }
    })
}

function remove(id) {
  return getById(id)
    .then(cohort => {
      return db('cohorts')
        .where('id', id)
        .del()
        .then(() => {
          return cohort
        });
    });
}