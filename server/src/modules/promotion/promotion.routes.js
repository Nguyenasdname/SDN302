const express = require('express')
const router = express.Router()
const promotionController = require('./promotion.controller')
const { tokenProvider } = require('../../middlewares/authMiddleware');
const { allowRoles } = require('../../middlewares/roleMiddleware');

// Tạo KM
router.post('/', tokenProvider, allowRoles('employee'), promotionController.createPromotion)

// Lấy all KM
router.get('/', tokenProvider, allowRoles('admin', 'employee'), promotionController.getAllPromotions)

// Lấy KM theo id
router.get('/:id', tokenProvider, allowRoles('admin', 'employee'), promotionController.getPromotionById)

// Tìm KM theo code
router.get('/code/:code', promotionController.getPromotionByCode)

// Update KM
router.put('/:id', tokenProvider, allowRoles('employee'), promotionController.updatePromotion)

// Xóa KM
router.delete('/:id', tokenProvider, allowRoles('admin', 'employee'), promotionController.deletePromotion)

// Check KM
router.get('/validate/:code', promotionController.validatePromotion)

module.exports = router