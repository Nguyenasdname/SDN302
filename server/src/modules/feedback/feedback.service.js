const Feedback = require('./feedback.model')
const Booking = require('../booking/boooking.model')

exports.getFeedbackByResortId = async (resortId) => {
    try {
        const feedbacks = await Feedback.find({
            resortId
        }).populate({
            path: 'userId',
            select: '-userPass'
        })
        return feedbacks
    } catch (err) {
        console.error(err)
    }
}

exports.editFeedback = async (feedbackId, rating, comment) => {
    try {
        const feedback = await Feedback.findById(feedbackId)
        feedback.rating = rating
        feedback.comment = comment
        return await feedback.save()
    } catch (err) {
        console.error(err)
    }
}

exports.writeFeedback = async (userId, resortId, rating, comment) => {
    try {

        const booking = await Booking.findOne({
            userId,
            resortId,
            bookingStatus: 'Completed'
        })

        if (!booking) {
            throw new Error('Booking Before Feedback')
        }

        const newFeedback = new Feedback({
            resortId,
            userId,
            rating,
            comment
        })

        return await newFeedback.save()
    } catch (err) {
        console.error(err)
    }
}

exports.getFeedbackStatsByResortId = async (resortId) => {
    try {
        const feedbacks = await Feedback.find({ resortId })

        const totalRating = feedbacks.reduce((sum, fb) => sum + fb.rating, 0)
        const averageRating = feedbacks.length > 0 ? totalRating / feedbacks.length : 0

        return {
            averageRating: Number(averageRating.toFixed(2)),
            totalFeedbacks: feedbacks.length,
            feedbacks
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}