const Contact = require('./contact.model')
const EmailService = require('../email/email.service')
const emailTemplate = require('../email/email.templates')

exports.CreateContact = async (userId, contactData) => {
    try {

        const newContact = new Contact({
            userId,
            ...contactData
        })
        return await newContact.save()
    } catch (err) {
        console.error(err)
    }
}

exports.GetAllContact = async () => {
    try {
        return await Contact.find()
    } catch (err) {
        console.error(err)
    }
}

exports.GetInquiriesContact = async () => {
    try {
        return await Contact.find({
            contactStatus: { $in: ['Seen', 'Replied', 'New'] }
        }).populate({
            path: 'userId',
            select: '-userPass'
        })
    } catch (err) {
        console.error(err)
    }
}

exports.GetRefundContact = async () => {
    try {
        return await Contact.find({
            contactStatus: { $in: ['Pending-Refund', 'Refunded'] }
        }).populate({
            path: 'userId',
            select: '-userPass'
        })
    } catch (err) {
        console.error(err)
    }
}

exports.SetSeenContact = async (contactId) => {
    try {
        const contact = await Contact.findById(contactId)
        contact.contactStatus = 'Seen'
        return await contact.save()
    } catch (err) {
        console.error(err)
    }
}

exports.ReplyContact = async (contactId, replyMessage) => {
    try {
        const contact = await Contact.findById(contactId).populate('userId')
        contact.contactStatus = 'Replied'
        await EmailService.sendMail(
            contact.userId.userEmail,
            'Reply Contact',
            emailTemplate.replyContact(replyMessage, contact)
        )
        return await contact.save()
    } catch (err) {
        console.error(err)
    }
}