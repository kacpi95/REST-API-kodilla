const express = require('express');
const app = express();
const cors = require('cors');

const testimonialsRoutes = require('./routes/testimonials.routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', testimonialsRoutes);
app.use((req, res) => {
  res.status(404).json({ message: '404 not found...' });
});

app.listen(8000, () => {
  console.log('Server is running');
});
