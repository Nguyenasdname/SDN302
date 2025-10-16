const contactService = require('./contact.service')

// Tạo contact
exports.createContact = async (req, res) => {
    try {
        const userId = req.user_id
        const { contactTitle, contactContent } = req.body;

        const contact = await contactService.createContact({ userId, contactTitle, contactContent });
        
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Lấy all contact cho admin
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await contactService.getAllContacts();

        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Lấy contact = id
exports.getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await contactService.getContactById(id);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Update contact
exports.updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await contactService.updateContact(id, req.body);

        if (!updated) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Xóa contact
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await contactService.deleteContact(id)

        if (!deleted) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// User xem lại contact
exports.getContactsByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const contacts = await contactService.getContactsByUser(userId);
        
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}