const Resort = require("./resort.model");
const ImageResort = require("../imageResort/imageResort.model");
const Booking = require('../booking/boooking.model')
const { uploadImageToCloudinary } = require("../cloudinary/cloudinary.service")

// Lấy all resort
exports.getAllResorts = async () => {
  // try {
  //   return await Resort.find().sort({ createDate: -1 });
  // } catch (error) {
  //   throw error;
  // }
  try {
    const resorts = await Resort.find().sort({ createDate: -1 }).lean();

    const resortIds = resorts.map(resort => resort._id);

    const images = await ImageResort.find({ resortId: { $in: resortIds } })
      .select("resortId imageUrl -_id")
      .lean();

    // Tạo map để nhóm ảnh theo resortId
    const imageMap = images.reduce((acc, img) => {
      const id = img.resortId.toString();
      if (!acc[id]) acc[id] = [];
      acc[id].push(img.imageUrl);
      return acc;
    }, {});

    // Gắn ảnh vào từng resort
    const resortsWithImages = resorts.map(resort => ({
      ...resort,
      images: imageMap[resort._id.toString()] || [],
    }));

    return resortsWithImages;
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


exports.getAvailableResorts = async (startDate, endDate, numberOfGuests) => {
  const activeStatuses = ['Pending', 'Confirmed', 'CheckIn', 'CheckOut'];

  try {
    let availableResorts;

    if (!startDate || !endDate) {
      // Nếu không có ngày thì trả về toàn bộ resort có sức chứa phù hợp
      availableResorts = await Resort.find({
        resortCapacity: { $gte: numberOfGuests || 1 }
      });
    } else {
      // Tìm các resort bị cấn lịch
      const conflictedResorts = await Booking.find({
        bookingStatus: { $in: activeStatuses },
        $or: [
          { checkIn: { $lt: endDate }, checkOut: { $gt: startDate } }
        ]
      }).distinct('resortId');

      // Trả về các resort không bị cấn và đủ sức chứa
      availableResorts = await Resort.find({
        _id: { $nin: conflictedResorts },
        resortCapacity: { $gte: numberOfGuests || 1 }
      });
    }

    // Lấy danh sách ảnh cho các resort
    const resortIds = availableResorts.map(resort => resort._id);
    const images = await ImageResort.find({ resortId: { $in: resortIds } })
      .select("resortId imageUrl -_id")
      .lean();

    const imageMap = images.reduce((acc, img) => {
      const id = img.resortId.toString();
      if (!acc[id]) acc[id] = [];
      acc[id].push(img.imageUrl);
      return acc;
    }, {});

    const resortsWithImages = availableResorts.map(resort => ({
      ...resort.toObject(), // chuyển sang plain object để thêm field mới
      images: imageMap[resort._id.toString()] || []
    }));

    return resortsWithImages;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

