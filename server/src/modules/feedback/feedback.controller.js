const feedbackService = require('./feedback.service')
const Booking = require('../booking/boooking.model')
const Resort = require('../resort/resort.model')
const mongoose = require('mongoose')
const { uploadImageToCloudinary } = require('../cloudinary/cloudinary.service');

// update điểm tb và số đánh giá
async function recalcAndSaveResortStats(resortId) {
    const stats = await feedbackService.aggregateStats(resortId)
    await Resort.findByIdAndUpdate(resortId, {
        avgRating: stats.avgRating,
        reviewCount: stats.count
    })
}

// feedbakc mới
exports.createFeedback = async (req, res) => {
    try {
        const userId = req.user._id
        const { resortId, rating, comment, requireBooking = true } = req.body

        if (!resortId || !rating) return res.status(400).json({ message: 'Thiếu resortId hoặc rating' });

        const resort = await Resort.findById(resortId)
        if (!resort) return res.status(404).json({ message: 'Không tìm thấy resort' });
        
        if (requireBooking === 'true' || requireBooking === true) {
            const booking = await Booking.findOne({
                userId, 
                resortId,
                bookingStatus: { $in: ['completed', 'checkOut'] }
            })
            if (!booking) return res.status(403).json({ message: 'Phải hoàn thành Booking mới có thể đánh giá' })
        }

        const images = []
        if (req.files && req.files.length > 0) {
            for (let i = 0; i < req.files.length; i++) {
                const file = req.files[i]
                const customName = `${userId}_${resortId}_${Date.now()}_${i}`
                const imageUrl = await uploadImageToCloundinary(file.path, customName, 'feedback-images')
                images.push(imageUrl)
            }
        }

        const created = await feedbackService.create({
            resortId,
            userId,
            rating: Number(rating),
            comment,
            images
        })

        await recalcAndSaveResortStats(resortId)

        return res.status(201).json({ message: 'Đăng thành công', feedback: created })
    } catch (err) {
        console.error('createFeedback error:', err)
        res.status(500).json({ message: err.message })
    }
}

// Lấy feedback của 1 resort
exports.getFeedbackByResort = async (req, res) => {
    try {
        const resortId = req.params.resortId
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10

        const sortBy = req.query.sortBy === 'top' ? { helpful: -1, rating: -1 } : { createdAt: -1 }
        const includeHidden = req.user && ['admin', 'employee'].includes(req.user.userRole) && req.query.includeHidden === 'true';

        const data = await feedbackService.findByResort(resortId, { page, limit, sort: sortBy, includeHidden })
        const stats = await feedbackService.aggregateStats(resortId)

        res.json({ ...data, stats })
    } catch (err) {
        console.error('getFeedbackByResort error:', err)
        res.status(500).json({ message: err.message })
    }
}

// lấy feedback chính mình
exports.getMyFeedbacks = async (req, res) => {
    try {
        const userId = req.user._id
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const data = await feedbackService.findByUser(userId, { page : limit })
        res.json(data)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// update feedback
exports.updateFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.id
        const userId = req.user._id
        const existing = await feedbackService.findById(feedbackId)
        if (!existing) return res.status(404).json({ message: 'Không tìm thấy feedback' });
        if (existing.userId.toString() !== userId.toString())
            return res.status(403).json({ message: 'Bạn không có quyền chỉnh sửa' })
        
        const updateData = {}
        if (req.body.rating) updateData.rating = Number(req.body.rating);
        if (req.body.comment) updateData.comment = req.body.comment;
        
        if (req.files && req.files.length > 0) {
            const uploaded = []
            for (let i = 0; i < req.files.length; i++) {
                const file = req.files[i]
                const customName = `${userId}_${existing.resortId}_${Date.now()}_${i}`
                const imageUrl = await uploadImageToCloudinary(file.path, customName, 'feedback-images')
                uploaded.push(imageUrl)
            }
            updateData.images = uploaded
        }

        const updated = await feedbackService.updateById(feedbackId, updateData)
        await recalcAndSaveResortStats(existing.resortId)

        res.json({ message: 'Cập nhật thành công', feedback: updated })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Xóa feedback
exports.deleteFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.id
        const userId = req.user._id
        const isAdmin = req.user.userRole === 'admin'
        const existing = await feedbackService.findById(feedbackId)
        if (!existing) return res.status(404).json({ message: 'Không tìm thấy phản hồi' });
        
        if (!isAdmin && existing.userId.toString() !== userId.toString())
            return res.status(403).json({ message: 'Bạn không có quyền xóa feedback này' })

        await feedbackService.deleteById(feedbackId);
        await recalcAndSaveResortStats(existing.resortId)

        res.json({ message: 'Đã xóa feedback' })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Trả lời feedback
exports.replyToFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.id
        const responderId = req.user._id
        const { reply } = req.body
        if (!reply) return res.status(400).json({ message: 'Không thể để trống' });

        const existing = await feedbackService.findById(feedbackId)
        if (!existing) return res.status(404).json({ message: 'Không tìm thấy phản hồi' });

        const update = {
            reply: { content: reply, repliedBy: responderId, repliedAt: new Date() }
        }

        const updated = await feedbackService.updateById(feedbackId, update)
        res.json({ message: 'Trả lời thành công', feedback: updated })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Ẩn/Hiện feedback
exports.moderateFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.id
        const { action } = req.body

        if (!['hide', 'publish'].includes(action)) return res.status(400).json({ message: 'Không hợp lệ' });

        const existing = await  feedbackService.findById(feedbackId)
        if (!existing) return res.status(404).json({ message: 'Không tìm thấy phản hồi' });

        const status = action === 'hide' ? 'hidden' : 'published'
        const updated = await feedbackService.updateById(feedbackId, { status })

        await recalcAndSaveResortStats(existing.resortId)

        res.json({ message: 'Đã cập nhật trạng thái thành công', feedback: updated })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// feedback hữu ích
exports.markHelpful = async (req, res) => {
    try {
        const feedbackId = req.params.id
        const userId = req.user._id
        const updated = await feedbackService.addHelpful(feedbackId, userId)
        res.json({ message: 'Đã đánh dấu hữu ích', feedback: updated })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// báo cáo feedback
exports.flagFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.id
        const userId = req.user._id
        const updated = await feedbackService.addFlag(feedbackId, userId)
        res.json({ message: 'Đã báo cáo phản hồi', feedback: updated })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// lấy ds resort đánh giá cao nhất
exports.getTopResorts = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 5
        const data = await feedbackService.aggregateTopResorts(limit)
        res.json({ top: data })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}