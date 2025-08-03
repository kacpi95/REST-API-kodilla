const express = require('express');
const testimonials = require('./db');
const app = express();
const shortid = require('shortid');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(testimonials);
});
app.get('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  const testimonial = testimonials.find((t) => t.id === id);
  res.json(testimonial);
});
app.get('/testimonials/random', (req, res) => {
  const random = Math.floor(Math.random() * testimonials.length);
  res.json(testimonials[random]);
});
app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const newElement = { id: shortid.generate(), author, text };
  testimonials.push(newElement);
  res.json({ message: 'OK' });
});
app.put('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  const { author, text } = req.body;
  const testimonialId = testimonials.findIndex((t) => t.id === id);
  if (testimonialId !== -1) {
    testimonials[testimonialId] = { id, author, text };
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Error' });
  }
});
app.delete('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  const testimonialId = testimonials.findIndex((t) => t.id === id);
  if (testimonialId !== -1) {
    testimonials.splice(testimonialId, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Error' });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: '404 not found...' });
});

app.listen(8000, () => {
  console.log('Server is running');
});
