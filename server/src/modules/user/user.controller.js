const userService = require('./user.service')

exports.getAllUser = async (req, res) => {
    const users = await userService.getAllUser()
    res.json( users )
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