const bookingService = require('./booking.service')
const bookingServiceService = require('../bookingService/bookingService.service')
const Email = require('../email/email.service')
const EmailTemplate = require('../email/email.templates')
const User = require('../user/user.model')
const BookingService = require('../bookingService/bookingService.model')

exports.getListBooking = async (req, res) => {
    try {
        const listBooking = await bookingService.getListBooking()
        if (!listBooking) return res.status(404).json({ message: `Not Found` })
        res.json(listBooking)
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
        const user = await User.findById(userId).select('-userPass')
        const listBookingService = await BookingService.find({
            bookingId: newBooking._id
        }).populate('serviceId')
        const sendMailBooking = await bookingService.getBookingByBookingId(newBooking._id)
        console.log(sendMailBooking)
        await Email.sendMail(
            user.userEmail,
            'Confirm Your Booking Now',
            EmailTemplate.bookingConfirmationTemplate(user, sendMailBooking, listBookingService)
        )
        res.json({
            message: 'Successful!',
            newBooking
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message || 'Internal Server Error' })
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

exports.checkInBooking = async (req, res) => {
    const { bookingId } = req.params
    try {
        const checkInBooking = await bookingService.checkInBooking(bookingId)
        res.json({
            message: `Successful`,
            booking: checkInBooking
        })
    } catch (err) {
        console.error(err)
    }
}

exports.checkOutBooking = async (req, res) => {
    const { bookingId } = req.params
    try {
        const checkOutBooking = await bookingService.checkOutBooking(bookingId)
        const sendEmailBooking = await bookingService.getBookingByBookingId(bookingId)
        await Email.sendMail(
            sendEmailBooking.userId.userEmail,
            'Check Out Booking',
            EmailTemplate.checkOutNotificationTemplate(sendEmailBooking)
        )
        res.json({
            message: `Successful`,
            booking: checkOutBooking
        })
    } catch (err) {
        console.error(err)
    }
}

exports.cancelBooking = async (req, res) => {
    const userId = req.user.id
    const { bookingId } = req.params
    const { cancelReason } = req.body
    try {
        const booking = await bookingService.cancelBooking(bookingId, cancelReason, userId)
        res.json(booking)
    } catch (err) {
        console.error(err)
    }
}