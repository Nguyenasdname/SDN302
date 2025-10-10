const mongoose = require('mongoose')
const { Schema } = mongoose

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    paymentAmount: { type: Number },
    paymentMethod: { type: String },
    paymentStatus: { type: String },
    createDate: { type: Date, default: Date.now },
    promotionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' },
    paymentDescription: { type: String }
});

module.exports = mongoose.model('Payment', paymentSchema);
