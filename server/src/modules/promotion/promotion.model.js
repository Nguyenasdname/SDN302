const mongoose = require('mongoose')
const { Schema } = mongoose

const promotionSchema = new mongoose.Schema({
    promotionCode: { type: String, unique: true },
    discountPercent: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    promotionStatus: { type: String }
});

module.exports = mongoose.model('Promotion', promotionSchema);
