const express = require('express')
const router = express.Router()
const bookingServiceController = require('./bookingService.controller')

router.get('/', bookingServiceController.getListBookingService)
router.get('/:bookingId', bookingServiceController.getListBookingServiceByBookingId)
router.post('/addorupdate', bookingServiceController.addOrUpdateBookingService)

module.exports = router