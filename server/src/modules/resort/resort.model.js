const mongoose = require('mongoose');

const resortSchema = new mongoose.Schema({
  resortName: { type: String, required: true },
  resortDescription: { type: String },
  resortPrice: { type: Number },
  resortLocation: { type: String },
  resortStatus: { type: String, default: 'Available' },
  createDate: { type: Date, default: Date.now },
  resortCapacity: { type: Number, default: 2 },
  avgRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 

});

module.exports = mongoose.model('Resort', resortSchema);
