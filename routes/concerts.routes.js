const express = require('express');
const router = express.Router();
const db = require('../db');
const shortid = require('shortid');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.get('/concerts', (req, res) => {
  res.json(db.concerts);
});
router.get('/concerts/random', (req, res) => {
  const random = db.concerts[Math.floor(Math.random() * db.concerts.length)];
  res.json(random);
});
router.get('/concerts/:id', (req, res) => {
  const id = Number(req.params.id);
  const testimonial = db.concerts.find((t) => t.id === id);
  res.json(testimonial);
});

router.post('/concerts', (req, res) => {
  const { author, text } = req.body;
  const newElement = { id: shortid.generate(), author, text };
  db.concerts.push(newElement);
  res.json({ message: 'OK' });
});
router.put('/concerts/:id', (req, res) => {
  const id = Number(req.params.id);
  const { author, text } = req.body;
  const testimonialId = db.concerts.findIndex((t) => t.id === id);
  if (testimonialId !== -1) {
    db.concerts[testimonialId] = { id, author, text };
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Error' });
  }
});
router.delete('/concerts/:id', (req, res) => {
  const id = Number(req.params.id);
  const testimonialId = db.concerts.findIndex((t) => t.id === id);
  if (testimonialId !== -1) {
    db.concerts.splice(testimonialId, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Error' });
  }
});

module.exports = router;
