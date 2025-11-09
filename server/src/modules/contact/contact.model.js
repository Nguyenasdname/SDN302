const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    contactTitle: { type: String },
    contactContent: { type: String },
    contactStatus: { type: String, enum: ['New', 'Seen', 'Replied', 'Pending-Refund', 'Refunded'], default: 'New' },
    createDate: { type: Date, default: Date.now },
    refundAmount: Number
});

module.exports = mongoose.model('Contact', contactSchema);
