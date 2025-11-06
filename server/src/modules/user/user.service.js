const User = require('./user.model')

exports.getAllUser = async () => {
    try {
        return await User.find()
    } catch (err) {
        console.error(err)
    }
}

exports.getUserProfile = async (userId) => {
    try {
        const user = await User.findById(userId).select('-userPassword')
        return user
    } catch (err) {
        console.error(err)
    }
}
