const express = require('express');
const router = express.Router();

const cohorts = require('./cohortsModel.js');

router.post('/', (req, res) => {
  const cohort = req.body
  cohorts.add(cohort)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
});

router.get('/', (req, res) => {
  cohorts.get()
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  cohorts.getById(id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
});

router.get('/:id/students', (req, res) => {
  const id = req.params.id
  cohorts.getStudentsByCohort(id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: "something has gone wrong" }))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const changes = req.body
  cohorts.update(id, changes)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
});

router.delete('/:id', (req, res) => {
  const id = req.params.id
  cohorts.remove(id)
    .then(data => {
      data ? res.status(200).json(data) : res.status(404).json({ message: "no such item." })
    })
    .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
});

module.exports = router;