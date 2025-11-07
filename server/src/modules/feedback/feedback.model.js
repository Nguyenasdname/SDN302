const mongoose = require('mongoose')
const { Schema } = mongoose

const feedbackSchema = new Schema ({
    resortId: { type: Schema.Types.ObjectId, ref: 'Resort', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true },
    images: [{ type: String }],
    reply: { 
        content: { type: String }, 
        repliedBy: { type: Schema.Types.ObjectId, ref: 'User' }, 
        repliedAt: { type: Date } 
    },
    helpful: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    flaggedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    status: [{ type: String, enum: ['published', 'hidden', 'flagged'], default: 'published' }],
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
})

feedbackSchema.pre('save', function(next) {
    this.updateAt = Date.now();
    next();
})

module.exports = mongoose.model('Feedback', feedbackSchema);
