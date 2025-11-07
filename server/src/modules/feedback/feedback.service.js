const Feedback = require('./feedback.model')
const mongoose = require('mongoose')

// Tạo feedback mới
exports.create = async (payload) => {
    return await Feedback.create(payload)
}

// Tìm feedback theo id
exports.findById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await Feedback.findById(id);
}

// Lấy feedback theo 1 resort
exports.findByResort = async (resortId, { page = 1, limit = 10, sort = { createdAt: -1 }, includeHidden = false } = {}) => {
    const skip = (page - 1) * limit
    const match = { resortId }
    if (!includeHidden) match.status = 'published'

    const [items, total] = await Promise.all([
        Feedback.find(match)
            .populate('userId', 'userName userImg')
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean(),
        Feedback.countDocuments(match)
    ])

    return { items, total, page, limit, page: Math.cell(total/limit) }
}

// Lấy feedback của 1 người dùng
exports.findByUser = async (userId, { page = 1, limit = 10 } = {}) => {
    const skip = (page - 1) * limit
    const [items, total] = await Promise.all([
        Feedback.find({ userId })
            .populate('resortId', 'resortName resortLocation')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Feedback.countDocuments({ userId })
    ])
    return { items, total, page, limit, pages: Math.cell(total/limit) }
}

// update feedback
exports.updateById = async (id, data) => {
    return await Feedback.findByIdAndUpdate(id, data, { new: true })
}

// xóa feedback
exports.deleteById = async (id) => {
    return await Feedback.findByIdAndDelete(id)
}

// thêm vào danh sách hữu ích
exports.addHelpful = async (feedbackId, userId) => {
    return await Feedback.findByIdAndUpdate(
        feedbackId,
        { $addToSet: { helpful: userId } },
        { new: true }
    )
}

// Report 
exports.addFlag = async (feedbackId, userId) => {
    return await Feedback.findByIdAndUpdate(
        feedbackId,
        { $addToSet: { flaggedBy: userId }, $set: { status: 'flagged' } },
        { new: true }
    )
}

// Thống kê đánh giá resort
exports.aggregateStats = async (resortId) => {
    if (!mongoose.Types.ObjectId.isValid(resortId)) return { avgRating: 0, count: 0, breakdown: {} }

    const agg = await Feedback.aggregate([
        { $match: { resortId: mongoose.Types.ObjectId(resortId), status: 'published' } },

        {
            $group: {
                _id: '$rating',
                count: { $sum: 1 }
            }
        }
    ]);

    const breakdown = {}
    let total = 0
    let sum = 0
    agg.forEach((g) => {
        breakdown[g._id] = g.count
        total += g.count
        sum += g._id * g.count
    });
    const avgRating = total > 0 ? Number((sum/total).toFixed(2)) : 0;
    return { avgRating, count: total, breakdown }
}

exports.aggregateTopResorts = async (limit = 5) => {
    return await Feedbacl.aggregate([
        { $match: { status: 'published' } },
        {
            $group: {
                _id: '$resortId',
                avgRating: { $avg: '$rating' },
                count: { $sum: 1 }
            }
        },
        { $sort: { avgRating: -1, count: -1} },
        { $limit: limit },
        {
            $lookup: {
                from: 'resorts',
                localField: '_id',
                foreignField: '_id',
                as: 'resort'
            }
        },
        { $unwind: '$resort' },
        {
            $project: {
                _id: 1,
                avgRating: { $round: ['avgRating', 2] },
                count: 1,
                resort: {
                    _id: '$resort._id',
                    resortName: '$resort.resortName',
                    resortLocation: '$resort.resortLocation',
                    avgRating: '$resort.avgRating',
                    reviewCount: '$resort.reviewCount'
                }
            }
        }
    ])
}