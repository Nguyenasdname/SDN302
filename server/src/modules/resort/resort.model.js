const mongoose = require('mongoose')
const { Schema } = mongoose

const resortSchema = new mongoose.Schema({
    resortName: { type: String, required: true },
    resortDescription: { type: String },
    resortPrice: { type: Number },
    resortLocation: { type: String },
    resortStatus: { type: String, default: 'Available' },
    resortIMG: { type: String },
    createDate: { type: Date, default: Date.now },
    resortCapacity: { type: Number, default: 2 },
    services: [{ type: Schema.Types.ObjectId, ref: 'ServiceResort' }],
});

module.exports = mongoose.model('Resort', resortSchema);