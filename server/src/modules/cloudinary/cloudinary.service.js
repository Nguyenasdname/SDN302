const cloudinary = require('cloudinary').v2
const env = require('../../config/config.env')

cloudinary.config({
    cloud_name: env.cloudinaryName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret
})

exports.uploadImageToCloudinary = async (filePath, customName, folder = 'resort-image') => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            public_id: customName,
            folder,
            overwrite: true,
            resource_type: 'image'
        })
        return result.secure_url
    } catch (err) {
        throw new Error(`Faild To Upload Image: ${err.message}`)
    }
}