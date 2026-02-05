const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller.js');

router.get('/testimonials', TestimonialController.getAll);

router.get('/testimonials/random', TestimonialController.getRandom);

router.get('/testimonials/:id', TestimonialController.getTestimonialId);

router.post('/testimonials', TestimonialController.postTestimonial);

router.put('/testimonials/:id', TestimonialController.putTestimonial);

router.delete('/testimonials/:id', TestimonialController.deleteTestimonial);

module.exports = router;
