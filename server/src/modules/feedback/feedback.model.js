const mongoose = require('mongoose')
const { Schema } = mongoose

const feedbackSchema = new Schema({
    resortId: { type: Schema.Types.ObjectId, ref: 'Resort', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true },
    createAt: { type: Date, default: Date.now },
})

feedbackSchema.pre('save', function (next) {
    this.createAt = Date.now();
    next();
})

module.exports = mongoose.model('Feedback', feedbackSchema);
