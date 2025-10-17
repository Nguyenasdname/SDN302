const mongoose = require('mongoose')
const { Schema } = mongoose

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resortId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resort' },
    checkIn: { type: Date },
    checkOut: { type: Date },
    bookingStatus: { type: String, enum:['pending, competed, canceled'], default: 'pending' },
    createDate: { type: Date, default: Date.now },
    bookingTotal: { type: Number },
    numberOfGuest: { type: Number }
});

module.exports = mongoose.model('Booking', bookingSchema);
