// Xác nhận email
exports.verifyEmailTemplate = (verifyLink, userName, otp) => `
    <div style="line-height: 1.6;">
        <h2>Hello ${userName || ''}</h2>
        <p>Thank you for signing up our system! Please verify your email address:</p>
        <a href="${verifyLink}" style="text-decoration: none">Verify Email</a>
        <p>If you didn't sign up, please ignore this message</p>
        <div>Your OTP is: ${otp}</div>
    </div>
`

// Quên mật khẩu
exports.resetPasswordTemplate = (resetLink, userName) => `
    <div style="line-height: 1.6;">
        <h2>Hello ${userName || ''}</h2>
        <p>We received a request to reset your password</p>
        <a href="${resetLink}" style="text-decoration: none">Reset Password</a>
        <p>If you didn't request this, ignore this email</p>
    </div>
`

// Thanh toán
exports.paymentSuccessTemplate = (amount, paymentId, userName) => `
    <div style="line-height: 1.6;">
        <h2>Payment Successful</h2>
        <p>Hello ${userName || ''}</p>
        <p>We have successfully received your payment</p>
        <p><b>Amount:</b> ${amount}</p>
        <p><b>Payment ID:</b> ${paymentId}</p>
        <p>Thank you for your purchase</p>
    </div>
`

