const express = require('express');
const db = require('./db');
const app = express();
const shortid = require('shortid');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});
app.get('/testimonials/random', (req, res) => {
  const random =
    db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.json(random);
});
app.get('/testimonials/:id', (req, res) => {
  const id = Number(req.params.id);
  const testimonial = db.testimonials.find((t) => t.id === id);
  res.json(testimonial);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const newElement = { id: shortid.generate(), author, text };
  db.testimonials.push(newElement);
  res.json({ message: 'OK' });
});
app.put('/testimonials/:id', (req, res) => {
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
app.delete('/testimonials/:id', (req, res) => {
  const id = Number(req.params.id);
  const testimonialId = db.testimonials.findIndex((t) => t.id === id);
  if (testimonialId !== -1) {
    db.testimonials.splice(testimonialId, 1);
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
