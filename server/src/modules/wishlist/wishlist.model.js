const mongoose = require('mongoose')
const { Schema } = mongoose

const wishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    villaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Villa' }
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
