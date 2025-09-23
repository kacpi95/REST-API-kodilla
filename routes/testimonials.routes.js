const express = require('express');
const router = express.Router();
const db = require('../db');
const shortid = require('shortid');
const Testimonial = require('../models/testimonials.model');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.get('/testimonials', async (req, res) => {
  try {
    res.json(Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/testimonials/random', async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const random = Math.floor(Math.random() * count);
    const newTestimonial = await Testimonial.findOne().skip(random);
    if (!newTestimonial) res.status(404).json({ message: 'Not Found' });
    else res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) res.status(404).json({ message: 'Not Found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
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
