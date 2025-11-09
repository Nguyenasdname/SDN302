const feedbackService = require('./feedback.service')
const Booking = require('../booking/boooking.model')
const Resort = require('../resort/resort.model')

exports.getFeedbackByResortId = async (req, res) => {
    const { resortId } = req.params
    try {
        const feedbacks = await feedbackService.getFeedbackByResortId(resortId)
        res.json(feedbacks)
    } catch (err) {
        console.error(err)
    }
}

exports.editFeedback = async (req, res) => {
    const { feedbackId, rating, comment } = req.body
    try {
        const feedback = feedbackService.editFeedback(feedbackId, rating, comment)
        res.json({
            message: `Successful`,
            feedback
        })
    } catch (err) {
        console.error(err)
    }
}

exports.writeFeedback = async (req, res) => {
    const { resortId, rating, comment } = req.body
    const userId = req.user.id
    try {
        console.log(`${resortId}, ${userId}, ${rating}, ${comment}`)
        const feedback = await feedbackService.writeFeedback(userId, resortId, rating, comment)
        res.json(feedback)
    } catch (err) {
        console.error(err)
    }
}

exports.getFeedbackStatsByResortId = async (req, res) => {
    const { resortId } = req.params
    try {
        const stats = await feedbackService.getFeedbackStatsByResortId(resortId)
        res.json(stats)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Failed to fetch feedback stats', error: err.message })
    }
}