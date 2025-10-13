const ServiceResort = require('./serviceResort.model')
const Resort = require('../resort/resort.model')

// Lấy all services của 1 resort
exports.getServicesByResortId = async (resortId) => {    
    try {
        return await ServiceResort.find({ resortId })
        .populate('resortId', 'resortName resortLocation')
    } catch (error) {
        throw error;
    }   
};

// Lấy all service 
exports.getAllServicesResort = async () => {    
    try {
        return await ServiceResort.find()
        .populate('resortId', 'resortName resortLocation')
        .sort({ createDate: -1 });
    } catch (error) {
        throw error;
    }
};

// Lấy service theo id
exports.getServiceResortById = async (id) => {
    try {
        return await Service
            .findById(id);
    } catch (error) {
        throw error;
    }
};

// Tạo mới service
exports.createServiceResort = async (data) => {
    try {       
        const resort = await Resort.findById(data.resortId);
        if (!resort) {
            throw new Error('Resort not found');
        }   

        const newService = new ServiceResort(data);
        const SavedServiceResort = await newService.save();

        resort.services.push(SavedServiceResort._id);
        await resort.save();

        return SavedServiceResort;  
    } catch (error) {
        throw error;
    }
};

// Cập nhật service
exports.updateService = async (id, data) => {
    try {
        const updatedServiceResort = await ServiceResort.findByIdAndUpdate(id, data, { new: true });
        if (!updatedServiceResort) {
            throw new Error('Service not found');
        }
        return updatedServiceResort;
    } catch (error) {
        throw error;
    }
};

// Xoá service
exports.deleteService = async (id) => {
    try {
        const deletedServiceResort = await ServiceResort.findById(id);
        if (!deletedServiceResort) {
            throw new Error('Service not found');
        }

        // Xoá service khỏi mảng resort.services
        await Resort.findByIdAndUpdate(deletedServiceResort.resortId, {
            $pull: { services: deletedServiceResort._id }
        });

        await ServiceResort.findByIdAndDelete(id);
        return deletedServiceResort;
    } catch (error) {
        throw error;
    }
};