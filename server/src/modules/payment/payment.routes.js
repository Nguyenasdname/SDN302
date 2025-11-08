const Payment = require('./payment.controller')
const router = require('express').Router()
const authMiddleware = require('../../middlewares/authMiddleware')

router.post('/', authMiddleware.tokenProvider, Payment.createPayment)

module.exports = router