const mongoose = require('mongoose')
const { Schema } = mongoose

const contactSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    contactTitle: { type: String },
    contactContent: { type: String },
    contactStatus: { type: String, enum: ['Unseen', 'Seen'], default: 'Unseen' },
    createDate: { type: Date, default: Date.now },
    refundStatus: { type: String }
});

module.exports = mongoose.model('Contact', contactSchema);
