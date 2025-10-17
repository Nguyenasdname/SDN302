const express = require('express');
const router = express.Router();
const wishlistController = require('./wishlist.controller');
const { tokenProvider } = require('../../middlewares/authMiddleware');
const { allowRoles } = require('../../middlewares/roleMiddleware');

// Thêm vào wishlist
router.get('/', tokenProvider, allowRoles('user', 'employee', 'admin'), wishlistController.addToWishlist)

// Lấy ds wishlist
router.get('/', tokenProvider, allowRoles('user', 'employee', 'admin'), wishlistController.getWishlist)

// Xóa 1 mục khỏi wishlist
router.delete('/:villaId', tokenProvider, allowRoles('user', 'employee', 'admin'), wishlistController.removeFormWishlist)

// Xóa hết wishlist
router.delete('/', tokenProvider, allowRoles('user', 'employee', 'admin'), wishlistController.clearWishlist)

module.exports = router