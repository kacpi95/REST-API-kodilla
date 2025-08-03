const express = require('express');
const router = express.Router();
const db = require('../db');
const shortid = require('shortid');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});
router.get('/testimonials/random', (req, res) => {
  const random =
    db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.json(random);
});
router.get('/testimonials/:id', (req, res) => {
  const id = Number(req.params.id);
  const testimonial = db.testimonials.find((t) => t.id === id);
  res.json(testimonial);
});

router.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const newElement = { id: shortid.generate(), author, text };
  db.testimonials.push(newElement);
  res.json({ message: 'OK' });
});
router.put('/testimonials/:id', (req, res) => {
  const id = Number(req.params.id);
  const { author, text } = req.body;
  const testimonialId = db.testimonials.findIndex((t) => t.id === id);
  if (testimonialId !== -1) {
    db.testimonials[testimonialId] = { id, author, text };
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Error' });
  }
});
router.delete('/testimonials/:id', (req, res) => {
  const id = Number(req.params.id);
  const testimonialId = db.testimonials.findIndex((t) => t.id === id);
  if (testimonialId !== -1) {
    db.testimonials.splice(testimonialId, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Error' });
  }
});

module.exports = router;
