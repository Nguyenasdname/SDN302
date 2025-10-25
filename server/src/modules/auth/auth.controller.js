const authService = require('./auth.service')
const User = require('../user/user.model')
const EmailService = require('../email/email.service')
const envConfig = require('../../config/config.env')
const emailTemplate = require('../email/email.templates')

exports.login = async (req, res) => {
    console.log('Body:', req.body)
    const { loginId, userPass } = req.body
    try {
        const user = await User.findOne({
            $or: [{ userName: loginId }, { userEmail: loginId }]
        })
        console.log(user)

        if (!user || !(await user.comparePassword(userPass))) {
            return res.status(401).json({ message: 'Wrong email or password' })
        }

        if (user.userStatus === 'Banned' || user.userStatus === 'UnVerified') {
            return res.status(401).json({ message: `Got Banned` })
        }

        const token = authService.generateTokenLogin(user)
        user.userPass = undefined

        res.status(200).json({ token, user });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
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
                userImg: avata,
                userStatus: 'Active'
            }).save()
        }
        const token = authService.generateTokenLogin(user)
        user.userPass = undefined
        res.json({ token, user })
    } catch (err) {
        console.error(err)
    }
}

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body
        const { action } = req.query
        let user = await User.findOne({ userEmail: email })
        if (!user) return res.status(404).json({ message: `Not Found!` })
        user.userPass = undefined
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const token = authService.generateTokenVerifyEmail(user, otp, action)
        const verifyLink = `${envConfig.baseAppUrl}/verify_link?token=${token}`
        await EmailService.sendMail(
            email,
            'Verify Your Email',
            emailTemplate.verifyEmailTemplate(verifyLink, user.userName, otp)
        )
        res.json({
            message: `Successful`,
            token,
            email
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.verifyOTPToken = async (req, res) => {
    const { otp } = req.body
    try {
        if (!otp) return res.status(400).json({ message: 'OTP is required' });

        if (req.user.otp !== otp) return res.status(400).json({ message: `Wrong OTP` })

        if (req.user.action === 'forgotPassword') {
            return res.json({
                message: `Successful`,
                action: req.user.action,
                id: req.user.id
            })
        }

        if (req.user.action === 'register') {
            const user = await User.findById(req.user.id)
            user.userStatus = 'Active'
            await user.save()
            const token = authService.generateTokenLogin(user)
            user.userPass = undefined
            return res.json({ token, user, action: req.user.action })
        }

    } catch (err) {
        console.error(err)
    }
}

exports.verifyLinkToken = async (req, res) => {
    const token = req.body.token || req.query.token
    if (!token) return res.status(400).json({ message: `Token is required` })
    try {
        const decoded = authService.verifyToken(token)

        if (decoded.action === 'forgotPassword') {
            return res.json({
                action: decoded.action,
                id: decoded.id
            })
        }
        if (decoded.action === 'register') {
            const user = await User.findById(decoded.id)
            user.userStatus = 'Active'
            await user.save()
            const token = authService.generateTokenLogin(user)
            user.userPass = undefined
            res.json({ token, user, action: decoded.action })
        }

    } catch (err) {
        console.error(err)
    }
}

exports.changePassword = async (req, res) => {
    const { newPassword, id } = req.body
    try {
        const user = await User.findById(id)
        user.userPass = newPassword
        await user.save();
        res.status(200).json({ message: `Password changed successfully` })
    } catch (err) {
        console.error(err)
    }
}

exports.register = async (req, res) => {
    const {
        userName,
        userEmail,
    } = req.body

    try {
        const errors = {};

        if (await User.findOne({ userName })) {
            errors.userName = 'Username already exists';
        }

        if (await User.findOne({ userEmail })) {
            errors.userEmail = 'Email already exists';
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }
        const user = await new User(req.body).save()

        user.userFirstName = `User ${user._id}`
        await user.save()

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const token = authService.generateTokenVerifyEmail(user, otp, 'register')
        const verifyLink = `${envConfig.baseAppUrl}/verify_link?token=${token}`
        await EmailService.sendMail(
            userEmail,
            'Verify Your Email',
            emailTemplate.verifyEmailTemplate(verifyLink, user.userName, otp)
        )
        res.json({
            message: `Successful`,
            token,
            email: userEmail
        })
    } catch (err) {
        console.error(err)
    }
}