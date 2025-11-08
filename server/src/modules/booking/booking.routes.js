const express = require('express')
const router = express.Router()
const bookingController = require('./booking.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

router.get('/', bookingController.getListBooking)
router.get('/user', bookingController.getListBookingByUserId)
router.get('/:bookingId', bookingController.getBookingDetails)
router.post('/', authMiddleware.tokenProvider, bookingController.createNewBooking)
router.patch('/', bookingController.updateBooking)
router.patch('/:bookingId/confirm', bookingController.confirmBooking)

module.exports = router