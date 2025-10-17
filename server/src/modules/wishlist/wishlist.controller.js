const wishlistService = require('./wishlist.service')

// Thêm vào wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { villaId } = req.body;

        const added = await wishlistService.addToWishlist({ userId, villaId })
    
        if (!added) {
            return res.status(400).json({ message: 'Already in wishlist' });
        }

        res.status(201).json({ message: 'Added to wishlist', data: added })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Lấy wishlisy user
exports.getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const wishlist = await wishlistService.getWishlistByUser(userId);
        
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Xóa 1 mục khỏi wishlist
exports.removeFormWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { villaId } = req.body;

        const removed = await wishlistService.removeFromWishlist({ userId, villaId })

        if (!removed) {
            return res.status(404).json({ message: 'Villa not found in wishlist' })
        }

        res.status(200).json({ message: 'Removed form wishlist successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Xóa hết wishlist
exports.clearWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        await wishlistService.clearWishlist({ userId, villaId })
        res.status(200).json({ message: 'Wishlist cleared' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}