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
        const resort = await resortService.getResortById(req.params.id);
        if (!resort) {
            return res.status(404).json({ message: 'Resort not found' });
        }
        res.status(200).json(resort);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

    // Tạo mới resort
exports.createResort = async (req, res) => {
  try {
    console.log('📦 Body:', req.body);
    console.log('🖼 Files:', req.files);

    const {
      resortName,
      resortDescription,
      resortPrice,
      resortLocation,
      resortCapacity,
      resortStatus,
    } = req.body;

    // 1️⃣ Tạo resort trước
    const newResort = await resortService.createResort({
      resortName,
      resortDescription,
      resortPrice,
      resortLocation,
      resortCapacity,
      resortStatus,
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
        const resort = await Resort.findById(req.params.id);
        if (!resort) {
            return res.status(404).json({ message: 'Resort not found' });
        }

        if (req.user.id === 'employee' && resort.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No Access' });
        }

        const updatedResort = await resortService.updateResort(req.params.id, req.body);
        res.status(200).json(updatedResort);
    } catch (error) {
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

exports.getAvailableResorts = async (req, res) => {
    const { startDate, endDate, numberOfGuest } = req.body
    try {
        const availableResorts = await resortService.getAvailableResorts(startDate, endDate, numberOfGuest)
        return availableResorts
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}