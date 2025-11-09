const ContactService = require('./contact.service')

exports.CreateContact = async (req, res) => {
    const { contactData } = req.body
    const userId = req.user.id
    try {
        const newContact = await ContactService.CreateContact(userId, contactData)
        res.json(newContact)
    } catch (err) {
        console.error(err)
    }
}

exports.GetAllContact = async (req, res) => {
    try {
        const contacts = await ContactService.GetAllContact()
        res.json(contacts)
    } catch (err) {
        console.error(err)
    }
}

exports.GetInquiriesContact = async (req, res) => {
    try {
        const contacts = await ContactService.GetInquiriesContact()
        res.json(contacts)
    } catch (err) {
        console.error(err)
    }
}

exports.GetRefundContact = async (req, res) => {
    try {
        const contacts = await ContactService.GetRefundContact()
        res.json(contacts)
    } catch (err) {
        console.error(err)
    }
}

exports.SetSeenContact = async (req, res) => {
    const { contactId } = req.params
    try {
        const contact = await ContactService.SetSeenContact(contactId)
        res.json({
            message: `Successful`,
            contact
        })
    } catch (err) {
        console.error(err)
    }
}

exports.ReplyContact = async (req, res) => {
    const { contactId } = req.params
    const { replyMessage } = req.body
    try {
        const contact = await ContactService.ReplyContact(contactId, replyMessage)
        res.json(contact)
    } catch (err) {
        console.error(err)
    }
}