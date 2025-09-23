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
    const newSeat = new Seat(
      { day: day, seat: seat, client: client, email: email },
      { new: true }
    );
    await newSeat.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

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
