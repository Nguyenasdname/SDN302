const serviceResortService = require('./serviceResort.service');

// Lấy tất cả Service trên hệ thống cho admin
exports.getAllServicesResort = async (req, res) => {
    try {
        const services = await serviceResortService.getAllServicesResort();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy all services của 1 resort
exports.getServicesByResortId = async (req, res) => {
    try {
        const { resortId } = req.params;
        const services = await serviceResortService.getServicesByResortId(resortId);
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy service theo id
exports.getServiceResortById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await serviceResortService.getServiceResortById(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }   
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo mới service dành cho employee
exports.createServiceResort = async (req, res) => {
    try {
        const newService = await serviceResortService.createServiceResort(req.body);
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }       
};

// Cập nhật service dành cho employee
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedService = await serviceResortService.updateService(id, req.body);
        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xoá service dành cho employee
exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedService = await serviceResortService.deleteService(id);
        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};