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
    if (!seat) res.status(400).json({ message: 'Not Found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postSeat = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const newSeat = new Seat({
      day: day,
      seat: seat,
      client: client,
      email: email,
    });
    await newSeat.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putSeatId = async (req, res) => {
  const { author, text } = req.body;
  try {
    const seat = await Seat.findByIdAndUpdate(
      req.params.id,
      {
        author: author,
        text: text,
      },
      { new: true }
    );
    if (!seat) res.status(404).json({ message: 'Not Found' });
    else res.json({ seat });
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
