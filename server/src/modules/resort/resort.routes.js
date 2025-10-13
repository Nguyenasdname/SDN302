const express = require('express');
const router = express.Router();
const resortController = require('./resort.controller');
const { tokenProvider } = require('../../middlewares/authMiddleware');
const { allowRoles } = require('../../middlewares/roleMiddleware');

// Lấy all resort cho tất cả mọi người
router.get('/', resortController.getAllResorts);

// Lấy chi tiết resort cho tất cả mọi người
router.get('/:id', resortController.getResortById);

// Tạo mới resort (chỉ employee)
router.post('/', tokenProvider, allowRoles('employee'), resortController.createResort);

// Cập nhật resort (chỉ employee)
router.put('/:id', tokenProvider, allowRoles('employee'), resortController.updateResort);

// Xoá resort (admin và employee)
router.delete('/:id', tokenProvider, allowRoles('admin', 'employee'), resortController.deleteResort);

module.exports = router;