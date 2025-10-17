const mongoose = require('mongoose')
const { Schema } = mongoose

const bookingServiceSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceResort' },
    quantity: { type: Number },
    totalPrice: { type: Number }
});

module.exports = mongoose.model('BookingService', bookingServiceSchema);
