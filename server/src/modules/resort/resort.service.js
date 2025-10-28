const Resort = require("./resort.model");
const ServiceResort = require("../serviceResort/serviceResort.model");
const Booking = require('../booking/boooking.model')

// Lấy all resort
exports.getAllResorts = async () => {
  try {
    return await Resort.find()
      .populate('services')
      .sort({ createDate: -1 });
  } catch (error) {
    throw error;
  }
};

// Lấy resort theo id
exports.getResortById = async (id) => {
  try {
    return await Resort.findById(id).populate('services');
  } catch (error) {
    throw error;
  }
};

// Resort mới
exports.createResort = async (data) => {
  try {
    // Tạo resort
    const newResort = new Resort(data);
    await newResort.save();

    // Tạo service resort
    const serviceResort = []
    for (const svc of data.services) {
      const newServiceResort = new ServiceResort({ ...svc });
      const savedServiceResort = await newServiceResort.save();
      serviceResort.push(savedServiceResort._id);
    }

    // Gắn service resort vào resort
    newResort.services = serviceResort;
    await newResort.save();

    return await newResort.populate('services');
  } catch (error) {
    throw error;
  }
};

// Cập nhật resort
exports.updateResort = async (id, data) => {
  try {
    return await Resort.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw error;
  }
};

// Xoá resort
exports.deleteResort = async (id) => {
  try {
    const resort = await Resort.findById(id);
    if (!resort) {
      throw new Error('Resort not found');
    }

    // Xoá các service resort liên quan tới resort muốn xóa
    await ServiceResort.deleteMany({ _id: { $in: resort.services } });

    await Resort.findByIdAndDelete(id);
    return resort;
  } catch (error) {
    throw error;
  }
};

exports.checkAvailable = async (resortId, startDate, endDate) => {
  const activeStatuses = ['pending', 'confirmed', 'checkIn', 'checkOut']

  try {
    const conflictBooking = await Booking.findOne({
      resortId,
      bookingStatus: { $in: activeStatuses },
      $or: [
        { checkIn: { $lt: endDate }, checkOut: { $gt: startDate } }
      ]
    })

    return conflictBooking
  } catch (err) {
    console.error(err)
  }
}

exports.getAvailableResorts = async (startDate, endDate, numberOfGuest) => {
  const activeStatuses = ['pending', 'confirmed', 'checkIn', 'checkOut'];

  try {
    const bookedResorts = await Booking.find({
      bookingStatus: { $in: activeStatuses },
      $or: [
        { checkIn: { $lt: endDate }, checkOut: { $gt: startDate } }
      ]
    }).distinct('resortId');

    const availableResorts = await Resort.find({
      _id: { $nin: bookedResorts },
      resortCapacity: { $gte: numberOfGuest }
    })

    return availableResorts

  } catch (err) {
    console.error(err)
  }
}