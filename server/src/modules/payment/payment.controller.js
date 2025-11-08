const paymentService = require('./payment.service')

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