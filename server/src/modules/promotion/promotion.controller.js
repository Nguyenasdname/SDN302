const promotionService = require('./promotion.service')

// Tạo KM
exports.createPromotion = async (req, res) => {
    try {
        const newPromotion = await promotionService.createPromotion(req.body);
        res.status(201).json(newPromotion);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Lấy all KM
exports.getAllPromotions = async (req, res) => {
    try {
        const promotions = await promotionService.getAllPromotions();
        res.status(200).json(promotions);
    } catch (error) {
        res.status(500).json({ message:error.message })
    }
}

// Lấy KM = id
exports.getPromotionById = async (req, res) => {
    try {
        const { id } = req.params;
        const promo = await promotionService.getPromotionById(id);

        if (!promo) {
            return res.status(404).json({ message: 'Promotion not found' })
        }
        
        res.status(200).json(promo);
    } catch (error) {
        res.status(500).json({ message:error.message })
    }
}

// Tìm KM theo code
exports.getPromotionByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const promo = await promotionService.getPromotionByCode(code);

        if (!promo) {
            return res.status(404).json({ message: 'Promotion not found' });
        }

        res.status(200).json(promo);
    } catch (error) {
        res.status(500).json({ message:error.message })
    }
}

// Updated KM
exports.updatePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = promotionService.updatePromotion(id, req.body);

        if (!updated) {
            return res.status(404).json({ message: 'Promotion not found' });
        }

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message:error.message })
    }
} 

// Xóa KM
exports.deletePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = promotionService.deletePromotion(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Promotion not found' });
        }

        res.status(200).json({ message: 'Deleted promotion successfully' })
    } catch (error) {
        res.status(500).json({ message:error.message })
    }
}

// Check KM
exports.validatePromotion = async (req, res) => {
    try {
        const { code } = req.params;
        const promo = await promotionService.validatePromotion(code);

        if (!promo) {
            return res.status(404).json({ message: 'Invalid or expired promotion code' });
        }

        res.status(200).json(promo);
    } catch (error) {
        res.status(500).json({ message:error.message })
    }
}