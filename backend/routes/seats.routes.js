const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAll);
router.get('/seats/random', SeatController.getRandom);
router.get('/seats/:id', SeatController.getSeatId);
router.post('/seats', SeatController.postSeat);
router.put('/seats/:id', SeatController.putSeatId);
router.delete('/seats/:id', SeatController.deleteSeat);

module.exports = router;
