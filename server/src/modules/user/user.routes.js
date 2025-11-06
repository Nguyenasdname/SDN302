const express = require('express')
const router = express.Router()
const userController = require('./user.controller')
const { tokenProvider } = require('../../middlewares/authMiddleware')
const { allowRoles } = require('../../middlewares/roleMiddleware')

router.get('/profile', tokenProvider, userController.getUserProfile)
router.get('/', tokenProvider, allowRoles('admin'), userController.getAllUser)

module.exports = router