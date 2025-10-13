const mongoose = require('mongoose')
const { Schema } = mongoose

const serviceSchema = new mongoose.Schema({
    serviceName: { type: String },
    serviceDescription: { type: String },
    servicePrice: { type: Number },
    createDate: { type: Date, default: Date.now },
    serviceIMG: { type: String },
    resortId: { type: Schema.Types.ObjectId, ref: 'Resort' },   
});

module.exports = mongoose.model('ServiceResort', serviceSchema);
