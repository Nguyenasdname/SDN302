const userService = require('./user.service')

exports.getAllUser = async (req, res) => {
    const users = await userService.getAllUser()
    res.json(users)
}

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await userService.getUserProfile(userId)

        if (!user) {
            return res.status(404).json({ message: `User Not Found` })
        }

        res.json(user)
    } catch (err) {

    }
}

exports.updateUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body
        await userService.updateUserRole(userId, role)
        res.json({ message: 'Successful' })
    } catch (err) {
        console.error(err)
    }
}

exports.updateUserStatus = async (req, res) => {
    try {
        const { userId, status } = req.body
        await userService.updateUserStatus(userId, status)
        res.json({ message: 'Successful' })
    } catch (err) {
        console.error(err)
    }
} 