const express = require('express')
const router = express.Router()
const authController = require('./auth.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

router.post('/login', authController.login)
router.post('/google-login', authController.googleLogin)
router.post('/send-otp', authController.sendOTP)
router.post('/verify-otp', authMiddleware.tokenProvider, authController.verifyOTPToken)
router.put('/change-forgot-password', authController.changeFogotPassword)
router.post('/register', authController.register)
router.post('/verify-link', authController.verifyLinkToken)
router.patch('/change-password', authMiddleware.tokenProvider, authController.changePassword)

module.exports = router