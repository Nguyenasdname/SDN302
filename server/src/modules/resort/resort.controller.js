const resortService = require('./resort.service');
// Lấy all resort
exports.getAllResorts = async (req, res) => {
    try {
        const resorts = await resortService.getAllResorts();
        res.status(200).json(resorts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy chi tiết resort
exports.getResortById = async (req, res) => {
    try {
        const resort = await resortService.getResortById(req.params.id);
        if (!resort) {
            return res.status(404).json({ message: 'Resort not found' });
        }
        res.status(200).json(resort);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo mới resort
exports.createResort = async (req, res) => {
    try {
        const { services, ...resortData } = req.body;
        const newResort = await resortService.createResort({ ...resortData, services });
        res.status(201).json(newResort);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật resort
exports.updateResort = async (req, res) => {
    try {
        const updatedResort = await resortService.updateResort(req.params.id, req.body);
        if (!updatedResort) {
            return res.status(404).json({ message: 'Resort not found' });
        }
        res.status(200).json(updatedResort);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xoá resort
exports.deleteResort = async (req, res) => {
    try {
        const deletedResort = await resortService.deleteResort(req.params.id);
        if (!deletedResort) {
            return res.status(404).json({ message: 'Resort not found' });
        }
        res.status(200).json({ message: 'Resort deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.checkAvailable = async (req, res) => {
    const resortId = req.query.resortId
    const { startDate, endDate } = req.body
    try {
        const conflictBooking = await resortService.checkAvailable(resortId, startDate, endDate)
        if (conflictBooking) {
            return res.json({
                message: `Conflict`,
                conflictBooking
            })
        }

        res.json({
            message: `Available`,
            startDate: startDate,
            endDate: endDate
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getAvailableResorts = async (req, res) => {
    const { startDate, endDate, numberOfGuest } = req.body
    try {
        const availableResorts = await resortService.getAvailableResorts(startDate, endDate, numberOfGuest)
        return availableResorts
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}