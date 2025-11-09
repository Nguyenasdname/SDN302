const Booking = require('./boooking.model')
const Payment = require('../payment/payment.model')
const Contact = require('../contact/contact.model')

exports.getListBooking = async () => {
    try {
        return await Booking.find().populate('userId').populate('resortId')
    } catch (err) {
        console.error(err)
    }
}

exports.getListBookingByUserId = async (userId) => {
    try {
        return await Booking.find({ userId }).populate('userId').populate('resortId')
    } catch (err) {
        console.error(err)
    }
}

exports.getBookingDetails = async (bookingId) => {
    try {
        return await Booking.findById(bookingId).populate('userId').populate('resortId')
    } catch (err) {
        console.error(err)
    }
}

exports.createNewBooking = async (bookingData, userId) => {
    try {

        const { checkIn, checkOut, ...rest } = bookingData
        const newBooking = new Booking({
            userId,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            ...rest
        })
        return await newBooking.save()
    } catch (err) {
        console.error(err)
    }
}

exports.updateBooking = async (bookingId, bookingData) => {
    try {
        return await Booking.findByIdAndUpdate(bookingId, bookingData, { new: true })
    } catch (err) {
        console.error(err)
    }
}

exports.getBookingByStatus = async (status) => {
    try {
        const filter = {}
        if (status) {
            filter.bookingStatus = status
        }

        return await Booking.find(filter).populate('userId').populate('resortId')
    } catch (err) {
        console.error(err)
    }
}

exports.confirmBooking = async (bookingId, depositAmount) => {
    try {
        const booking = await Booking.findById(bookingId)
        booking.status = 'Confirmed'
        booking.bookingTotal -= depositAmount
        return await booking.save()
    } catch (err) {
        console.error(err)
    }
}

exports.completedBooking = async (bookingId) => {
    try {
        const booking = await Booking.findById(bookingId)
        booking.bookingStatus = 'Completed'
        return await booking.save()
    } catch (err) {
        console.error(err)
    }
}

exports.checkInBooking = async (bookingId) => {
    try {
        const booking = await Booking.findById(bookingId)
        booking.bookingStatus = 'CheckIn'
        return await booking.save()
    } catch (err) {
        console.error(err)
    }
}

exports.checkOutBooking = async (bookingId) => {
    try {
        const booking = await Booking.findById(bookingId)
        booking.bookingStatus = 'CheckOut'
        return await booking.save()
    } catch (err) {
        console.error(err)
    }
}

exports.cancelBooking = async (bookingId, cancelReason, userId) => {
    try {
        const booking = await Booking.findById(bookingId)
        booking.bookingStatus = 'Cancelled'
        const newContact = new Contact({
            userId,
            contactTitle: 'Cancel Booking',
            contactContent: cancelReason,
            contactStatus: 'Refunded',
            refundAmount: 0
        })
        await newContact.save()
        return await booking.save()
    } catch (err) {
        console.error(err)
    }
}