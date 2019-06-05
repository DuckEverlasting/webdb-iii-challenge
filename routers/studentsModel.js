const db = require('../data/dbConfig.js')

module.exports = {
  add,
  get,
  getById,
  update,
  remove
}

function add(student) {
  return db('students')
    .insert(student)
    .then(ids => {
      [id] = ids;
      return getById(id);
    });
}

function get() {
  return db('students')
}

function getById(id) {
  return db('students')
    .join('cohorts', 'cohorts.id', 'students.cohort_id')
    .select('students.id', 'students.name', 'cohorts.name as cohort')
    .where('students.id', id)
    .first();
}

function update(id, changes) {
  return db('students')
    .where('id', id)
    .update(changes)
    .then(student => {
      if(student > 0) {
        return getById(id);
      } else {
        return null;
      }
    })
}

function remove(id) {
  return getById(id)
    .then(student => {
      return db('students')
        .where('id', id)
        .del()
        .then(() => {
          return student
        });
    });
}