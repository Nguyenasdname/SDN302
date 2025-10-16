const express = require('express');
const router = express.Router();
const contactController = require('./contact.controller')
const { tokenProvider } = require('../../middlewares/authMiddleware')
const { allowRoles } = require('../../middlewares/roleModdleware')

// Tạo contact
router.post('/', tokenProvider, allowRoles('user', 'employee', 'admin'), contactController.createContact);

// Admin xem all contact
router.get('/', tokenProvider, allowRoles('admin'), contactController.getAllContacts);

// Admin xem contact theo id
router.get('/:id', tokenProvider, allowRoles('admin'), contactController.getContactById);

// Admin update contact
router.put('/:id', tokenProvider, allowRoles('admin'), contactController.updateContact);

// Admin xóa contact
router.delete('/:id', tokenProvider, allowRoles('admin'), contactController.deleteContact);

// User xem lại contact mình
router.get('/myContact', tokenProvider, allowRoles('user', 'employee', 'admin'), contactController.getContactsByUser);

module.exports = router;