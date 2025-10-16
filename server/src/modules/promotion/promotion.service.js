const Promotion = require('./promotion.model')

// Tạo KM
exports.createPromotion = async (data) => {
    try {
        const newPromotion = new Promotion(data);
        return await newPromotion.save();
    } catch (error) {
        throw error
    }
}

// Lấy all KM
exports.getAllPromotions = async () => {
    try {
        return await Promotion.find().sort({ startDate: -1 });
    } catch (error) {
        throw error
    }
}

// Lấy KM theo id
exports.getPromotionById = async (id) => {
    try {
        return await Promotion.findById();
    } catch (error) {
        throw error
    }
}

// Tìm KM bằng code
exports.getPromotionByCode = async (code) => {
    try {
        return await Promotion.findOne({ promotionCode: code });
    } catch (error) {
        throw error
    }
}

// Update KM
exports.updatePromotion = async (id, data) => {
    try {
        return await Promotion.findByIdAndUpdate(id, data, { new:true });
    } catch (error) {
        throw error
    }
}

// Xóa KM
exports.deletePromotion = async (id) => {
    try {
        return await Promotion.findByIdAndDelete(id);
    } catch (error) {
        throw error
    }
}

// Check KM
exports.validatePromotion = async (code) => {
    try {
        const promo = await Promotion.findOne({ promotionCode: code });

        if (!promo || promo.promotionStatus !== 'Active' || 
            new Date() < promo.startDate || new Date() > promp.endDate) {
            return null;
        }

        return promo;
    } catch (error) {
        throw error
    }
}