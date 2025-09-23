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

router.post('/testimonials', async (req, res) => {
  const { author, text } = req.body;

  try {
    const newTestimonial = new Testimonial({ author: author, text: text });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/testimonials/:id', async (req, res) => {
  const { author, text } = req.body;

  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { author, text },
      { new: true }
    );
    if (!testimonial) res.status(404).json({ message: 'Not Found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) res.status(404).json({ message: 'Not Found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
