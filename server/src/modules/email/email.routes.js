const express = require('express')
const router = express.Router()
const emailController = require('./email.controller')

router.post('/verify', emailController.sendVerifyEmail)
router.post('/resetPassword', emailController.sendResetPasswordEmail)
router.post('/paymentSuccess', emailController.sendPaymentSuccessEmail)

module.exports = router
