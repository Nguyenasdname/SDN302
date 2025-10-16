const Wishlist = require('./wishlist.model')

// Thêm vào wishlist
exports.addToWishlist = async (data) => {
    try {
        const existing = await Wishlist.findOne({ 
            userId: data.userId,
            villaId: data.villaId
        });

        if (existing) {
            return null;
        }

        const newItem = new Wishlist(data);
        return await newItem.save();
    } catch (error) {
        throw error
    }
}

// Lấy ưishlist của 1 user 
exports.getWishlistByUser = async (userId) => {
    try {
        return await Wishlist.find({ userId })
        .populate('villaId')
        .sort({ _id: -1 })
    } catch (error) {
        throw error
    }
}

// Xóa khỏi ứihlist
exports.removeFromWishlist = async (userId, villaId) => {
    try {
        return await Wishlist.findByIdAndDelete({ userId, villaId });
    } catch (error) {
        throw error
    }
}

// Xóa wishlist
exports.clearWishlist = async (userId) => {
    try {
        return await Wishlist.deleteMany({ userId });
    } catch (error) {
        throw error
    }
}