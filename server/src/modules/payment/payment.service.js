const Payment = require('./payment.model')

exports.getAllPayment = async () => {
    try {
        return await Payment.find()
    } catch (err) {
        console.error(err)
    }
}

exports.getAllPaymentById = async (paymentId) => {
    try {
        return await Payment.findById(paymentId)
    } catch (err) {
        console.error(err)
    }
}

exports.getAllPaymentByUserId = async (userId) => {
    try {
        return await Payment.find({ userId })
    } catch (err) {
        console.error(err)
    }
}

exports.getAllPaymentByBookingId = async (bookingId) => {
    try {
        return await Payment.find({ bookingId })
    } catch (err) {
        console.error(err)
    }
}

exports.createPayment = async (paymentData, userId) => {
    try {
        const newPayment = new Payment({
            userId,
            ...paymentData
        })

        return await Payment.save()
    } catch (err) {
        console.error(err)
    }
}

exports.updatePayment = async (paymentId, paymentData) => {
    try {
        return await Payment.findByIdAndUpdate(paymentId, paymentData, { new: true })
    } catch (err) {
        console.error(err)
    }
}

// exports.getAllPayment = async () => {
//     try {

//     } catch (err) {
//         console.error(err)
//     }
// }