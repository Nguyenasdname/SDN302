const paymentService = require('./payment.service')
const Email = require('../email/email.service')
const EmailTemplate = require('../email/email.templates')
const User = require('../user/user.model')

exports.getAllPayment = async (req, res) => {
    try {
        const payments = await paymentService.getAllPayment()
        if (!payments || payments.length === 0) return res.status(404).json({ message: `Not Found` })
        res.status(200).json({
            message: `Successful!`,
            payments
        })
    } catch (err) {
        console.error(err)
    }
}

exports.getAllPaymentById = async (req, res) => {
    try {
        const paymentId = req.params.paymentId
        const payment = await paymentService.getAllPaymentById(paymentId)
        if (!payment) return res.status(404).json({ message: `Not Found` })
        res.status(200).json({
            message: `Successful!`,
            payment
        })
    } catch (err) {
        console.error(err)
    }
}

exports.getAllPaymentByUserId = async (req, res) => {
    try {
        const userId = req.user.id
        const payments = await paymentService.getAllPaymentByUserId(userId)
        if (!payments || payments.length === 0) return res.status(404).json({ message: `Not Found` })
        res.status(200).json({
            message: `Successful!`,
            payments
        })
    } catch (err) {
        console.error(err)
    }
}

exports.getAllPaymentByBookingId = async (req, res) => {
    try {
        const bookingId = req.params.bookingId
        const payments = await paymentService.getAllPaymentByBookingId(bookingId)
        if (!payments || payments.length === 0) return res.status(404).json({ message: `Not Found` })
        res.status(200).json({
            message: `Successful!`,
            payments
        })
    } catch (err) {
        console.error(err)
    }
}

exports.createPayment = async (req, res) => {
    const userId = req.user.id
    try {
        const { paymentData } = req.body
        const newPayment = await paymentService.createPayment(paymentData, userId)
        const user = await User.findById(userId).select('-userPass')
        const sendMailPayment = await paymentService.getPaymentByIdPopulate(newPayment._id)
        if (newPayment.paymentStatus === 'Deposit') {
            await Email.sendMail(
                user.userEmail,
                'Confirm Booking',
                EmailTemplate.bookingConfirmationWithPaymentTemplate(sendMailPayment)
            )
        } else {
            await Email.sendMail(
                user.userEmail,
                'Completed Booking',
                EmailTemplate.bookingCompletedTemplate(sendMailPayment)
            )
        }
        res.status(200).json({
            message: `Successful!`,
            newPayment
        })
    } catch (err) {
        console.error(err)
    }
}

exports.updatePayment = async (req, res) => {
    try {
        const paymentId = req.params.paymentId
        const paymentData = req.body
        const updatePayment = await paymentService.updatePayment(paymentId, paymentData)
        res.status(200).json({
            message: `Successful!`,
            updatePayment
        })
    } catch (err) {
        console.error(err)
    }
}