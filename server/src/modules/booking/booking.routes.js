const express = require('express')
const router = express.Router()
const bookingController = require('./booking.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

router.get('/', bookingController.getListBooking)
router.get('/user', authMiddleware.tokenProvider, bookingController.getListBookingByUserId)
router.get('/:bookingId', bookingController.getBookingDetails)
router.post('/', authMiddleware.tokenProvider, bookingController.createNewBooking)
router.patch('/', bookingController.updateBooking)
router.patch('/:bookingId/confirm', bookingController.confirmBooking)
router.patch('/:bookingId/completed', bookingController.completedBooking)
router.patch('/:bookingId/checkIn', bookingController.checkInBooking)
router.patch('/:bookingId/checkOut', bookingController.checkOutBooking)

module.exports = router