const Resort = require("./resort.model");
const ImageResort = require("../imageResort/imageResort.model");
const Booking = require('../booking/boooking.model')
const { uploadImageToCloudinary } = require("../cloudinary/cloudinary.service")

// Lấy all resort
exports.getAllResorts = async () => {
  try {
    return await Resort.find().sort({ createDate: -1 });
  } catch (error) {
    throw error;
  }
};

// Lấy resort theo id

exports.getResortById = async (resortId) => {
  try {
    const resort = await Resort.findById(resortId).lean();
    if (!resort) return null;

    const images = await ImageResort.find({ resortId })
      .select("imageUrl -_id")
      .lean();

    return {
      ...resort,
      images: images.map(img => img.imageUrl),
    };
  } catch (error) {
    throw error;
  }
};

// Tạo resort
exports.createResort = async (data) => {
  const resort = await Resort.create(data);
  return resort;
};

// Thêm ảnh
exports.addResortImage = async (resortId, imageUrl) => {
  const image = await ImageResort.create({ resortId, imageUrl });
  return image;
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

    // Xóa ảnh liên quan
    await ImageResort.deleteMany({ resortId: id });

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

// exports.getAvailableResorts = async (startDate, endDate, numberOfGuest = 1, searchQuery = '') => {
//   try {
//     let bookedResorts = [];

//     // Nếu có ngày check-in/check-out mới lọc booking
//     if (startDate && endDate) {
//       const activeStatuses = ["pending", "confirmed", "checkIn", "checkOut"];
//       bookedResorts = await Booking.find({
//         bookingStatus: { $in: activeStatuses },
//         $or: [
//           { checkIn: { $lt: endDate }, checkOut: { $gt: startDate } }
//         ],
//       }).distinct("resortId");
//     }

//     // Build query filter
//     const query = {
//       resortCapacity: { $gte: numberOfGuest },
//     };

//     if (bookedResorts.length > 0) {
//       query._id = { $nin: bookedResorts };
//     }

//     if (searchQuery && searchQuery.trim() !== '') {
//   const regex = new RegExp(searchQuery, 'i'); // 'i' = case-insensitive
//   query.$or = [
//     { resortName: regex },
//     { resortDescription: regex }
//   ];
// }


//     const availableResorts = await Resort.find(query);
//     return availableResorts;
//   } catch (err) {
//     console.error('Error in getAvailableResorts:', err);
//     return [];
//   }
// };

exports.getAvailableResorts = async (startDate, endDate, numberOfGuests) => {
  const activeStatuses = ['pending', 'confirmed', 'checkIn', 'checkOut'];

  try {
    // Nếu không có ngày thì trả về toàn bộ resort có sức chứa phù hợp
    if (!startDate || !endDate) {
      return await Resort.find({
        resortCapacity: { $gte: numberOfGuests || 1 } // nếu không có số khách thì mặc định là 1
      });
    }

    // Tìm các resort bị cấn lịch
    const conflictedResorts = await Booking.find({
      bookingStatus: { $in: activeStatuses },
      $or: [
        { checkIn: { $lt: endDate }, checkOut: { $gt: startDate } }
      ]
    }).distinct('resortId');

    // Trả về các resort không bị cấn và đủ sức chứa
    const availableResorts = await Resort.find({
      _id: { $nin: conflictedResorts },
      resortCapacity: { $gte: numberOfGuests || 1 }
    });

    return availableResorts;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
