const express = require('express');
const router = express.Router();
const User = require('../models/user');

const { createBooking, getBookings } = require('../controllers/booking');

// * MAKE A BOOKING
router.post('/booking/:tutorId', createBooking);

// * GET BOOKINGS 
router.get('/bookings/:userId', getBookings)

module.exports = router;