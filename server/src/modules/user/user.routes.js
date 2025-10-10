const express = require('express')
const router = express.Router()
const userController = require('./user.controller')
const { tokenProvider } = require('../../middlewares/authMiddleware')

router.get('/profile', tokenProvider, userController.getUserProfile)

module.exports = router