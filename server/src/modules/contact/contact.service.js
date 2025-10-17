const Contact = require('./contact.model')

// Tạo contact mới
exports.createContact = async (data) => {
    try {
        const newContact = new Contact (data);
        return await newContact.save();
    } catch (error) {
        throw error;
    }
}

// Lấy contact cho admin
exports.getAllContacts = async () => {
    try {
        return await Contact.find()
        .populate('userId', 'userName userEmail')
        .sort({ createDate: -1 })
    } catch (error) {
        throw error
    }
} 

// Lấy contact theo Id
exports.getContactById = async (id) => {
    try {
        return await Contact.findById(id)
        .populate('userId', 'userName userEmail')
    } catch (error) {
        throw error
    }
}

// Cập nhật contact
exports.updateContact = async (id, data) => {
    try {
        return await Contact.findByIdAndUpdate(id, data, { new: true })
    } catch (error) {
        throw error
    }
}

// Xóa contact
exports.deleteContact = async (id) => {
    try {
        return await Contact.findByIdAndDelete(id)
    } catch (error) {
        throw error
    }
}

// User xem lại contact của mình 
exports.getContactsByUser = async (userId) => {
    try {
        return await Contact.find({ userId })
        .sort({ createDate: -1 })
    } catch (error) {
        throw error
    }
}