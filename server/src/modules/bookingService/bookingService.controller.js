const bookingServiceService = require('./bookingService.service')

exports.getListBookingService = async (req, res) => {
    try {
        const listBookingService = await bookingServiceService.getListBookingService()
        res.status(200).json(listBookingService)
    } catch {
        console.error(err)
    }
}

exports.getListBookingServiceByBookingId = async (req, res) => {
    try {
        const boookingId = req.params.bookingId
        const listBookingService = await bookingServiceService.getListBookingServiceByBookingId(boookingId)
        if (!listBookingService) return res.status(404).json({ message: `Not Found` })
        res.status(200).json(listBookingService)
    } catch {
        console.error(err)
    }
}

exports.createBookingService = async (req, res) => {
    try {
        const bookingId = req.params.bookingId
        const bookingServiceData = req.body
        const newBookingService = await bookingServiceService.createBookingService(bookingId, bookingServiceData)
        res.status(200).json(newBookingService)
    } catch {
        console.error(err)
    }
}

exports.createManyBookingService = async (req, res) => {
    try {
        const bookingId = req.params.bookingId
        const bookingServiceListData = req.body
        const newBookingServiceListData = await bookingServiceService.createManyBookingService(bookingId, bookingServiceListData)
        res.status(200).json(newBookingServiceListData)
    } catch {
        console.error(err)
    }
}

exports.updateBookingService = async (req, res) => {
    try {
        const bookingServiceId = req.params.bookingServiceId
        const bookingServiceData = req.body
        const updateBookingService = await bookingServiceService.updateBookingService(bookingServiceId, bookingServiceData)
        res.status(200).json(updateBookingService)
    } catch {
        console.error(err)
    }
}

exports.addOrUpdateBookingService = async (req, res) => {
    try {
        const bookingId = req.params.bookingId
        const bookingServiceListData = req.body
        const addOrUpdate = await bookingServiceService.addOrUpdateBookingService(bookingId, bookingServiceListData)
        res.status(200).json(addOrUpdate)
    } catch {
        console.error(err)
    }
}