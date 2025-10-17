const BookingService = require('./bookingService.model')
const ServiceResort = require('../serviceResort/serviceResort.model')

exports.getListBookingService = async () => {
    try {
        return await BookingService.find().populate('serviceId')
    } catch (err) {
        console.error(err)
    }
}

exports.getListBookingServiceByBookingId = async (bookingId) => {
    try {
        return await BookingService.find({ bookingId }).populate('serviceId')
    } catch (err) {
        console.error(err)
    }
}

exports.createBookingService = async (bookingId, bookingServiceData) => {
    try {
        const newBookingService = new BookingService({
            bookingId,
            ...bookingServiceData
        })
        return newBookingService.save()
    } catch (err) {
        console.error(err)
    }
}

exports.createManyBookingService = async (bookingId, bookingServiceListData) => {
    try {
        const listServiceBookingId = bookingServiceListData.map(bookingService => ({
            bookingId,
            ...bookingService
        }))
        return await BookingService.insertMany(listServiceBookingId)
    } catch (err) {
        console.error(err)
    }
}

exports.updateBookingService = async (bookingServiceId, bookingServiceData) => {
    try {
        return await BookingService.findByIdAndUpdate(bookingServiceId, bookingServiceData, { new: true })
    } catch (err) {
        console.error(err)
    }
}

exports.addOrUpdateBookingService = async (bookingId, bookingServiceListData) => {
    try {
        const bulkOps = []

        for (const bookingService of bookingServiceListData) {
            const { serviceId, quantity } = bookingService

            const serviceResort = await ServiceResort.findById(serviceId)
            const servicePrice = serviceResort.servicePrice

            bulkOps.push({
                updateOne: {
                    filter: { bookingId, serviceId },
                    update: {
                        $inc: { quantity: quantity },
                        $set: { totalPrice: quantity * servicePrice }
                    },
                    upsert: true
                }
            })
        }

        const result = await BookingService.bulkWrite(bulkOps)
        return result
    } catch (err) {
        console.error(err)
    }
}

// exports.addOrUpdateBookingService = async (bookingId, bookingServiceListData) => {
//     try {
//         const result = []

//         for (const bookingService of bookingServiceListData) {
//             const { serviceId, quantity } = bookingService

//             const existingBookingService = await BookingService.findOne({ bookingId, serviceId })
//             const service = await ServiceResort.findById(serviceId)
//             const totalPrice = quantity * service.servicePrice

//             if (existingBookingService) {
//                 existingBookingService.quantity += quantity
//                 existingBookingService.totalPrice = totalPrice
//                 const update = await existingBookingService.save()
//                 result.push(update)
//             } else {


//                 const newBookingService = new BookingService({
//                     bookingId,
//                     serviceId,
//                     quantity,
//                     totalPrice
//                 })
//                 const saved = await newBookingService.save()
//                 result.push(saved)
//             }

//             return result
//         }
//     } catch (err) {
//         console.error(err)
//     }
// }