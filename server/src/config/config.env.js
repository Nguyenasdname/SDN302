require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    baseAppUrl: process.env.BASE_APP_URL,
    mongoUri: process.env.MONGO_URI,
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET
}