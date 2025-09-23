const express = require('express');
const router = express.Router();
const db = require('../db');
const shortid = require('shortid');
const Concert = require('../models/concerts.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const random = Math.floor(Math.random() * count);
    const concert = await Concert.findOne().skip(random);
    if (!concert) res.status(404).json({ message: 'Not Found' });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertId = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) res.status(404).json({ message: 'Not Found' });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

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
