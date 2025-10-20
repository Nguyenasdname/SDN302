const { sendMail } = require('./email.service')
const { verifyEmailTemplate, resetPasswordTemplate, paymentSuccessTemplate } = require('./email.templates')

// Xác nhận email
exports.sendVerifyEmail = async (req, res) => {
    try {
        const { to, userName } = req.body;
        const verifyLink = `http://localhost:300/verify/${Date.now()}`

        await sendMail({
            to,
            subject: 'Verify your email address',
            html: verifyEmailTemplate(verifyLink, userName)
        })

        res.status(200).json({ message: 'Verify email sent successfully' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending verifycation emial'})
    }
}

// Reset Email
exports.sendResetPasswordEmail = async (req, res) => {
    try {
        const { to, userName } = req.body
        const resetLink = `http://localhost:3000/resetPassword/${Date.now()}`

        await sendMail({
            to,
            subject: 'Reset password',
            html: resetPasswordTemplate(resetLink, userName)
        })

        res.status(200).json({ message: 'Reset password email sent successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error sending reset password email' })
    }
}

// Thanh toán
exports.sendPaymentSuccessEmail = async (req, res) => {
    try {
        const { to, userName, amount, paymentId } = req.body

        await sendMail({
            to,
            subject: 'Payment Successfully',
            html: paymentSuccessTemplate(amount, paymentId, userName)
        })

        res.status(200).json({ message: 'Payment success email sent successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error sending payment email' })
    }
}

