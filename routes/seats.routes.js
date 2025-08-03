const express = require('express');
const router = express.Router();
const db = require('../db');
const shortid = require('shortid');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.get('/seats', (req, res) => {
  res.json(db.seats);
});
router.get('/seats/random', (req, res) => {
  const random = db.seats[Math.floor(Math.random() * db.seats.length)];
  res.json(random);
});
router.get('/seats/:id', (req, res) => {
  const id = Number(req.params.id);
  const testimonial = db.seats.find((t) => t.id === id);
  res.json(testimonial);
});

router.post('/seats', (req, res) => {
  const { author, text } = req.body;
  const newElement = { id: shortid.generate(), author, text };
  db.seats.push(newElement);
  res.json({ message: 'OK' });
});
router.put('/seats/:id', (req, res) => {
  const id = Number(req.params.id);
  const { author, text } = req.body;
  const testimonialId = db.seats.findIndex((t) => t.id === id);
  if (testimonialId !== -1) {
    db.seats[testimonialId] = { id, author, text };
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Error' });
  }
});
router.delete('/seats/:id', (req, res) => {
  const id = Number(req.params.id);
  const testimonialId = db.seats.findIndex((t) => t.id === id);
  if (testimonialId !== -1) {
    db.seats.splice(testimonialId, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Error' });
  }
});

module.exports = router;
