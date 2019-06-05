const express = require('express');
const router = express.Router();

const students = require('./studentsModel.js');

router.post('/', (req, res) => {
  const student = req.body
  students.add(student)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
});

router.get('/', (req, res) => {
  students.get()
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  students.getById(id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
  const id = req.params.id
  const changes = req.body
  students.update(id, changes)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
});

router.delete('/:id', (req, res) => {
  const id = req.params.id
  students.remove(id)
    .then(data => {
      data ? res.status(200).json(data) : res.status(404).json({ message: "no such item." })
    })
    .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
});

module.exports = router;