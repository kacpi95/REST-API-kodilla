const Testimonial = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const random = Math.floor(Math.random() * count);
    const newTestimonial = await Testimonial.findOne().skip(random);
    if (!newTestimonial) res.status(404).json({ message: 'Not Found' });
    else res.json(newTestimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getTestimonialId = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) res.status(404).json({ message: 'Not Found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postTestimonial = async (req, res) => {
  const { author, text } = req.body;

  try {
    const newTestimonial = new Testimonial({ author: author, text: text });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putTestimonial = async (req, res) => {
  const { author, text } = req.body;

  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { author, text },
      { new: true },
    );
    if (!testimonial) res.status(404).json({ message: 'Not Found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) res.status(404).json({ message: 'Not Found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
