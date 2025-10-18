const authService = require('./auth.service')
const User = require('../user/user.model')


exports.login = async (req, res) => {
    console.log('Body:', req.body)
    const { loginId, userPass } = req.body
    const user = await User.findOne({
        $or: [{ userName: loginId }, { userEmail: loginId }]
    })
    console.log(user)

    if (!user || !(await user.comparePassword(userPass))) return res.status(401).json({ message: 'Wrong email or password' })

    const token = authService.generateToken(user)
    user.userPass = undefined
    res.json({ token, user })
}

exports.googleLogin = async (req, res) => {
    const { googleToken } = req.body
    try {
        const payload = await authService.verifyGoogleToken(googleToken)
        const email = payload.email
        const firstName = payload.given_name
        const lastName = payload.family_name
        const avata = payload.picture

        let user = await User.findOne({ userEmail: email })

        if (!user) {
            user = await new User({
                userEmail: email,
                userName: email.split('@')[0],
                userFirstName: firstName,
                userLastName: lastName,
                userImg: avata
            }).save()
        }
        const token = authService.generateToken(user)
        user.userPass = undefined
        res.json({ token, user })
    } catch (err) {
        console.error(err)
    }
}