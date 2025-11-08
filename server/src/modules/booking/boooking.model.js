const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resortId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resort' },
    checkIn: { type: Date },
    checkOut: { type: Date },
    bookingStatus: { type: String, enum: ['pending', 'confirmed', 'completed', 'checkIn', 'checkOut', 'canceled'], default: 'pending' },
    createDate: { type: Date, default: Date.now },
    bookingTotal: { type: Number },
    numberOfGuests: { type: Number }
});

module.exports = mongoose.model('Booking', bookingSchema);
