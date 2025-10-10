const authService = require('./auth.service')
const User = require('../user/user.model')

exports.login = async (req, res) => {
    console.log('Body:', req.body)
    const { userEmail, userPass } = req.body
    const user = await User.findOne({ userEmail })
    console.log(user)

    if (!user || !(await user.comparePassword(userPass))) return res.status(401).json({ message: 'Wrong email or password' })

    const token = authService.generateToken(user)
    user.userPass = undefined
    res.json({ token, user })
}