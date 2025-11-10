const resortService = require('./resort.service');
const { uploadImageToCloudinary } = require('../cloudinary/cloudinary.service');
const ImageResort = require('../imageResort/imageResort.model');
const Resort = require('./resort.model')
// Lấy all resort
exports.getAllResorts = async (req, res) => {
  try {
    const resorts = await resortService.getAllResorts();
    res.status(200).json(resorts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết resort
exports.getResortById = async (req, res) => {
  try {
    const resortId = req.params.resortId; 

    const resort = await resortService.getResortById(resortId);
    if (!resort) {
      return res.status(404).json({ message: "Resort not found" });
    }

    // Lấy ảnh
    const images = await ImageResort.find({ resortId })
      .select("imageUrl -_id")
      .lean();

    const imageUrls = images.map(img => img.imageUrl);

    // Trả về dữ liệu sạch
    res.status(200).json({
      ...resort,           
      images: imageUrls,   
    });
  } catch (error) {
    console.error("getResortById error:", error);
    res.status(500).json({ message: error.message });
  }
};


// Tạo mới resort
exports.createResort = async (req, res) => {
  try {
    console.log('📦 Body:', req.body);
    console.log('🖼 Files:', req.files);

    const {
      name,
      description,
      price,
      location,
      maxOccupancy,
      status,
    } = req.body;

    // 1️⃣ Tạo resort trước
    const newResort = await resortService.createResort({
      resortName: name,
      resortDescription: description,
      resortPrice: price,
      resortLocation: location,
      resortCapacity: maxOccupancy,
      resortStatus: status,
      owner: req.user.id
    });

    // 2️⃣ Upload ảnh lên Cloudinary và lưu link
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const customName = `${newResort._id}_${i + 1}`;

        const imageUrl = await uploadImageToCloudinary(file.path, customName, 'resort-image');

        const newImage = new ImageResort({
          resortId: newResort._id,
          imageUrl
        });

        await newImage.save();
      }
    }

    // 3️⃣ Lấy lại resort kèm ảnh
    const resortWithImages = await resortService.getResortById(newResort._id);

    res.status(201).json({
      message: 'Resort created successfully!',
      resort: resortWithImages
    });

  } catch (error) {
    console.error('❌ Error creating resort:', error);
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật resort
exports.updateResort = async (req, res) => {
  try {
    const resortId = req.params.id;

    // Tìm resort
    const resort = await Resort.findById(resortId);
    if (!resort) {
      return res.status(404).json({ message: 'Resort not found' });
    }

    // Kiểm tra quyền
    if (req.user.userRole === 'employee' && resort.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No Access' });
    }

    console.log('Update Body:', req.body);
    console.log('Update Files:', req.files);

    // Cập nhật các field text
    const updates = {
      resortName: req.body.name,
      resortDescription: req.body.description,
      resortPrice: Number(req.body.price),
      resortHourlyPrice: Number(req.body.hourlyPrice) || 0,
      resortType: req.body.type,
      resortCapacity: Number(req.body.maxOccupancy),
      resortArea: Number(req.body.area),
      resortBeds: Number(req.body.beds),
      resortStatus: req.body.status,
      resortLocation: req.body.location,
      amenities: req.body.amenities ? JSON.parse(req.body.amenities) : [],
    };

    // Xử lý ảnh mới (nếu có)
    if (req.files && req.files.length > 0) {
      // Xóa ảnh cũ
      await ImageResort.deleteMany({ resortId });

      // Upload ảnh mới
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const customName = `${resortId}_${i + 1}`;
        const imageUrl = await uploadImageToCloudinary(file.path, customName, 'resort-image');

        await new ImageResort({
          resortId,
          imageUrl
        }).save();
      }
    }

    // Cập nhật resort
    Object.assign(resort, updates);
    await resort.save();

    // Lấy lại resort + ảnh
    const updatedWithImages = await resortService.getResortById(resortId);

    res.status(200).json({
      message: 'Resort updated successfully!',
      resort: updatedWithImages
    });

  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Xoá resort
exports.deleteResort = async (req, res) => {
  try {
    const deletedResort = await resortService.deleteResort(req.params.id);
    if (!deletedResort) {
      return res.status(404).json({ message: 'Resort not found' });
    }
    res.status(200).json({ message: 'Resort deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkAvailable = async (req, res) => {
  const resortId = req.query.resortId
  const { startDate, endDate } = req.body
  try {
    const conflictBooking = await resortService.checkAvailable(resortId, startDate, endDate)
    if (conflictBooking) {
      return res.json({
        message: `Conflict`,
        conflictBooking
      })
    }

    res.json({
      message: `Available`,
      startDate: startDate,
      endDate: endDate
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// exports.getAvailableResorts = async (req, res) => {
//   try {
//     const { searchQuery, startDate, endDate, numberOfGuest } = req.body;

//     // 1. Lọc resort theo searchQuery
//     const resorts = await Resort.find({
//       resortName: { $regex: searchQuery, $options: 'i' }
//     });

//     // 2. Lấy ảnh cho từng resort
//     const resortsWithImages = await Promise.all(
//       resorts.map(async resort => {
//         const images = await ImageResort.find({ resortId: resort._id });
//         return {
//           ...resort.toObject(),
//           images: images.map(img => img.imageUrl)
//         };
//       })
//     );

//     res.json(resortsWithImages);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

exports.getAvailableResorts = async (req, res) => {
  const { startDate, endDate, numberOfGuests } = req.body || {};

  try {
    const resorts = await resortService.getAvailableResorts(startDate, endDate, numberOfGuests);
    res.json(resorts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};