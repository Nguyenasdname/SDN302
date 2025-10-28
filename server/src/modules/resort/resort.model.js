const mongoose = require('mongoose')

const resortSchema = new mongoose.Schema({
    resortName: { type: String, required: true },
    resortDescription: { type: String },
    resortPrice: { type: Number },
    resortLocation: { type: String },
    resortStatus: { type: String, default: 'Available' },
    resortIMG: { type: String },
    createDate: { type: Date, default: Date.now },
    resortCapacity: { type: Number, default: 2 }
});

module.exports = mongoose.model('Resort', resortSchema);