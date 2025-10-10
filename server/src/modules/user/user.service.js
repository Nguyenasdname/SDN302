const User = require('./user.model')


// exports.getListUsers = async (req, res) => {
//     try {
//         const users = await User.find()
//         res.status(200).json(users)
//     } catch (err) {
//         console.error(` Error: ${err}`)
//         res.json({ message: `${err}` })
//     }
// }


exports.getUserProfile = async (userId) => {
    try {
        const user = await User.findById(userId).select('-userPassword')
        return user
    } catch (err) {

    }
}