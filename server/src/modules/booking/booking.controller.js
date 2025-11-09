const bookingService = require('./booking.service')
const bookingServiceService = require('../bookingService/bookingService.service')

exports.getListBooking = async (req, res) => {
    try {
        const listBooking = await bookingService.getListBooking()
        if (!listBooking) return res.status(404).json({ message: `Not Found` })
        res.json({
            message: `Get List Booking By Success!`,
            listBooking
        })
    } catch (err) {
        console.error(err)
    }
}

exports.getListBookingByUserId = async (req, res) => {
    try {
        const userId = req.user.id
        const listBooking = await bookingService.getListBookingByUserId(userId)
        if (!listBooking) return res.status(404).json({ message: `Not Found` })
        res.json(listBooking)
    } catch (err) {
        console.error(err)
    }
}

exports.getBookingDetails = async (req, res) => {
    try {
        const bookingId = req.params.bookingId
        const bookingDetails = await bookingService.getBookingDetails(bookingId)
        if (!bookingDetails) return res.status(404).json({ message: `Not Found` })
        res.json({
            message: `Get Booking Details Success`,
            bookingDetails
        })
    } catch (err) {
        console.error(err)
    }
}

exports.createNewBooking = async (req, res) => {
    try {
        const userId = req.user.id
        const { bookingData, bookingServiceData } = req.body
        const newBooking = await bookingService.createNewBooking(bookingData, userId)
        if (bookingServiceData) {
            await bookingServiceService.addOrUpdateBookingService(newBooking._id, bookingServiceData)
        }
        res.json({
            message: 'Successful!',
            newBooking
        })
    } catch (err) {
        console.error(err)
    }
}

exports.updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId
        const updateData = req.body
        const updateBooking = await bookingService.updateBooking(bookingId, updateData)
        if (!updateBooking) return res.status(404).json({ message: `Not Found` })
        res.status(200).json({
            message: `Booking Update Successfully!`,
            updateBooking
        })
    } catch (err) {
        console.error(err)
    }
}

exports.getBookingByStatus = async (req, res) => {
    try {
        const { status } = req.params
        const bookingList = await bookingService.getBookingByStatus(status)
        if (!bookingList) return res.status(404).json({ message: `Not Found` })
        res.status(200).json({
            message: `Successfully!`,
            bookingList
        })
    } catch (err) {
        console.error(err)
    }
}

exports.confirmBooking = async (req, res) => {
    const { bookingId } = req.params
    const { depositAmount } = req.body
    try {
        const confirmBooking = await bookingService.confirmBooking(bookingId, depositAmount)
        res.json({
            message: 'Successful',
            booking: confirmBooking
        })
    } catch (err) {
        console.error(err)
    }
}

exports.completedBooking = async (req, res) => {
    const { bookingId } = req.params
    try {
        const completedBooking = await bookingService.completedBooking(bookingId)
        res.json({
            message: `Successful`,
            booking: completedBooking
        })
    } catch (err) {
        console.error(err)
    }
}