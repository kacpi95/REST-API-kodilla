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

exports.postConcert = async (req, res) => {
  const { author, text } = req.body;
  try {
    const newConcert = new Concert({ author: author, text: text });
    await newConcert.save();
    res.json(newConcert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putConcertId = async (req, res) => {
  const { author, text } = req.body;

  try {
    const concert = await Concert.findByIdAndUpdate(
      req.params.id,
      { author: author, text: text },
      { new: true }
    );
    if (!concert) res.status(404).json({ message: 'Not Found' });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
exports.deleteConcert = async (req, res) => {
  try {
    const concert = await Concert.findByIdAndDelete(req.params.id);
    if (!concert) res.status(404).json({ message: 'Not Found' });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
