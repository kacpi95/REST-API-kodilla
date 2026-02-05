const Seat = require('../models/seats.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const random = Math.floor(Math.random() * count);
    const seat = await Seat.findOne().skip(random);
    if (!seat) res.status(404).json({ message: 'Not Found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getSeatId = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not Found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postSeat = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const newSeat = new Seat({
      day,
      seat,
      client,
      email,
    });
    await newSeat.save();
    res.status(201).json(newSeat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putSeatId = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const seat = await Seat.findByIdAndUpdate(
      req.params.id,
      {
        day,
        seat,
        client,
        email,
      },
      { new: true },
    );
    if (!seat) res.status(404).json({ message: 'Not Found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteSeat = async (req, res) => {
  try {
    const seat = await Seat.findByIdAndDelete(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not Found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
