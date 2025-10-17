const userService = require('./user.service')

exports.getListUsers = async (req, res) => {
    const users = userService.getListUsers()
    res.json({ users })
}

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await userService.getUserProfile(userId)

        if (!user) {
            return res.status(404).json({ message: `User Not Found` })
        }

        res.json({ user })
    } catch (err) {

    }
}