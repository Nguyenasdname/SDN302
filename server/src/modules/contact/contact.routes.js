const express = require('express');
const router = express.Router();
const ContactController = require('./contact.controller')
const { tokenProvider } = require('../../middlewares/authMiddleware')
const { allowRoles } = require('../../middlewares/roleMiddleware')

router.post('/', tokenProvider, ContactController.CreateContact)
router.get('/', ContactController.GetAllContact)
router.get('/inquiries', ContactController.GetInquiriesContact)
router.get('/refund', ContactController.GetRefundContact)
router.patch('/:contactId/seen', tokenProvider, ContactController.SetSeenContact)
router.patch('/:contactId/replied', tokenProvider, ContactController.ReplyContact)

module.exports = router;