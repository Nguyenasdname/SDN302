const express = require('express');
const router = express.Router();
const serviceResortController = require('./serviceResort.controller');
const { tokenProvider } = require('../../middlewares/authMiddleware');
const { allowRoles } = require('../../middlewares/roleMiddleware');


router.get('/', serviceResortController.getAllServicesResort);

// Lấy service theo id cho tất cả mọi người
router.get('/:id', serviceResortController.getServiceResortById);

// Tạo mới service dành cho employee
router.post('/', tokenProvider, allowRoles('employee', 'admin'), serviceResortController.createServiceResort);

// Cập nhật service dành cho employee
router.put('/:id', tokenProvider, allowRoles('employee'), serviceResortController.updateService);

module.exports = router;