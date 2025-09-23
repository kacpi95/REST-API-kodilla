const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  author: { type: String, require: true },
});
module.exports = mongoose.model('Testimonial', testimonialSchema);
