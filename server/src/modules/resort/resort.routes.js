const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const resortController = require('./resort.controller');
const { tokenProvider } = require('../../middlewares/authMiddleware');
const { allowRoles } = require('../../middlewares/roleMiddleware');

// Lấy all resort cho tất cả mọi người
router.get('/', resortController.getAllResorts);

// Lấy chi tiết resort cho tất cả mọi người
router.get('/:resortId', resortController.getResortById);

// Tạo mới resort (chỉ employee)
router.post('/', tokenProvider, allowRoles('employee', 'admin'), upload.array('images'), resortController.createResort);

// Cập nhật resort (chỉ employee)
router.put('/:id', tokenProvider, allowRoles('employee'), resortController.updateResort);

// Xoá resort (admin và employee)
router.delete('/:id', tokenProvider, allowRoles('admin', 'employee'), resortController.deleteResort);

router.post('/available', resortController.getAvailableResorts);


module.exports = router;