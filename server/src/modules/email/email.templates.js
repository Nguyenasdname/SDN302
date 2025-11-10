// Xác nhận email
exports.verifyEmailTemplate = (verifyLink, userName, otp) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #F4F1DE; background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e'); background-size: cover; background-position: center;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: rgba(255, 255, 255, 0.95); border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="padding: 20px 0; text-align: center;">
                <img src="https://via.placeholder.com/150x50?text=Resort+Logo" alt="Resort Logo" style="max-width: 150px;">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <h2 style="color: #0077B6; font-size: 24px; margin: 0 0 10px;">Welcome to Your Resort Adventure, ${userName || ''}!</h2>
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Thank you for joining our resort community! To get started, please verify your email address by clicking the button below:</p>
                <table align="center" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="background-color: #009B77; border-radius: 5px; padding: 12px 24px;">
                            <a href="${verifyLink}" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold;">Verify Your Email</a>
                        </td>
                    </tr>
                </table>
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 20px 0;">Alternatively, use this OTP to verify your account: <strong>${otp}</strong></p>
                <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 20px 0;">If you didn’t sign up, feel free to ignore this email.</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #0077B6; color: #ffffff; font-size: 12px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                <p style="margin: 0;">&copy; 2025 Booking Resort. All rights reserved.</p>
                <p style="margin: 5px 0;"><a href="https://yourresortwebsite.com" style="color: #F4F1DE; text-decoration: none;">Visit our website</a></p>
            </td>
        </tr>
    </table>
</body>
</html>
`
// Quên mật khẩu
exports.resetPasswordTemplate = (resetLink, userName) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #F4F1DE; background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e'); background-size: cover; background-position: center;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: rgba(255, 255, 255, 0.95); border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="padding: 20px 0; text-align: center;">
                <img src="https://via.placeholder.com/150x50?text=Resort+Logo" alt="Resort Logo" style="max-width: 150px;">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <h2 style="color: #0077B6; font-size: 24px; margin: 0 0 10px;">Password Reset Request, ${userName || ''}</h2>
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">We received a request to reset your password. Click the button below to set a new password:</p>
                <table align="center" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="background-color: #009B77; border-radius: 5px; padding: 12px 24px;">
                            <a href="${resetLink}" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold;">Reset Your Password</a>
                        </td>
                    </tr>
                </table>
                <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 20px 0;">If you didn’t request this, please ignore this email.</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #0077B6; color: #ffffff; font-size: 12px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                <p style="margin: 0;">&copy; 2025 Booking Resort. All rights reserved.</p>
                <p style="margin: 5px 0;"><a href="https://yourresortwebsite.com" style="color: #F4F1DE; text-decoration: none;">Visit our website</a></p>
            </td>
        </tr>
    </table>
</body>
</html>
`

// Thanh toán
exports.paymentSuccessTemplate = (amount, paymentId, userName) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #F4F1DE; background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e'); background-size: cover; background-position: center;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: rgba(255, 255, 255, 0.95); border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="padding: 20px 0; text-align: center;">
                <img src="https://via.placeholder.com/150x50?text=Resort+Logo" alt="Resort Logo" style="max-width: 150px;">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <h2 style="color: #0077B6; font-size: 24px; margin: 0 0 10px;">Payment Successful, ${userName || ''}!</h2>
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">We’re thrilled to confirm that your payment has been successfully received!</p>
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 10px;"><strong>Amount:</strong> ${amount}</p>
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;"><strong>Payment ID:</strong> ${paymentId}</p>
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Thank you for choosing our resort. We look forward to welcoming you!</p>
                <table align="center" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="background-color: #009B77; border-radius: 5px; padding: 12px 24px;">
                            <a href="https://yourresortwebsite.com/bookings" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold;">View Your Booking</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #0077B6; color: #ffffff; font-size: 12px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                <p style="margin: 0;">&copy; 2025 Booking Resort. All rights reserved.</p>
                <p style="margin: 5px 0;"><a href="https://yourresortwebsite.com" style="color: #F4F1DE; text-decoration: none;">Visit our website</a></p>
            </td>
        </tr>
    </table>
</body>
</html>
`

exports.replyContact = (replyMessage, contact) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Response</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #F4F1DE; background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e'); background-size: cover; background-position: center;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: rgba(255, 255, 255, 0.95); border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="padding: 20px 0; text-align: center;">
                <img src="https://via.placeholder.com/150x50?text=Resort+Logo" alt="Resort Logo" style="max-width: 150px;">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <h2 style="color: #0077B6; font-size: 24px; margin: 0 0 10px;">Hello ${contact.userId.userName || ''},</h2>
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">${replyMessage}</p>
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">We’re here to assist you with any further questions. Feel free to reach out!</p>
                <table align="center" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="background-color: #009B77; border-radius: 5px; padding: 12px 24px;">
                            <a href="https://yourresortwebsite.com/contact" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold;">Contact Us</a>
                        </td>
                    </tr>
                </table>
                <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 20px 0;">If you didn’t request this, please ignore this email.</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #0077B6; color: #ffffff; font-size: 12px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                <p style="margin: 0;">&copy; 2025 Booking Resort. All rights reserved.</p>
                <p style="margin: 5px 0;"><a href="https://yourresortwebsite.com" style="color: #F4F1DE; text-decoration: none;">Visit our website</a></p>
            </td>
        </tr>
    </table>
</body>
</html>
`

exports.bookingConfirmationTemplate = (user, booking, bookingServices) => {
    // Format dates for display
    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });

    // Calculate total service cost
    const totalServiceCost = bookingServices.reduce((sum, service) => sum + (service.totalPrice || 0), 0);

    // Generate services table rows
    const servicesRows = bookingServices.length > 0
        ? bookingServices.map(service => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; color: #333; font-size: 14px;">${service.serviceId.serviceName || 'Unknown Service'}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; color: #333; font-size: 14px; text-align: center;">${service.quantity || 1}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; color: #333; font-size: 14px; text-align: right;">$${service.totalPrice.toFixed(2)}</td>
        </tr>
      `).join('')
        : `<tr><td colspan="3" style="padding: 8px; color: #666; font-size: 14px; text-align: center;">No additional services booked.</td></tr>`;

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #F4F1DE; background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e'); background-size: cover; background-position: center;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: rgba(255, 255, 255, 0.95); border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="padding: 20px 0; text-align: center;">
                <img src="https://via.placeholder.com/150x50?text=Resort+Logo" alt="Resort Logo" style="max-width: 150px;">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <h2 style="color: #0077B6; font-size: 24px; margin: 0 0 10px;">Booking Confirmed, ${user.userName || 'Guest'}!</h2>
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">We’re excited to confirm your booking at ${booking.resortId.resortName || 'our resort'}! Below are the details of your upcoming stay.</p>
                
                <h3 style="color: #0077B6; font-size: 18px; margin: 20px 0 10px;">Booking Details</h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; color: #333;">
                    <tr>
                        <td style="padding: 8px 0;"><strong>Resort:</strong></td>
                        <td style="padding: 8px 0;">${booking.resortId.resortName || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Location:</strong></td>
                        <td style="padding: 8px 0;">${booking.resortId.resortLocation || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Check-In:</strong></td>
                        <td style="padding: 8px 0;">${formatDate(booking.checkIn)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Check-Out:</strong></td>
                        <td style="padding: 8px 0;">${formatDate(booking.checkOut)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Nights:</strong></td>
                        <td style="padding: 8px 0;">${booking.nights || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Guests:</strong></td>
                        <td style="padding: 8px 0;">${booking.numberOfGuests || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Booking Total:</strong></td>
                        <td style="padding: 8px 0;">$${booking.bookingTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Booking Status:</strong></td>
                        <td style="padding: 8px 0;">${booking.bookingStatus || 'Confirmed'}</td>
                    </tr>
                </table>

                <h3 style="color: #0077B6; font-size: 18px; margin: 20px 0 10px;">Additional Services</h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                    <tr style="background-color: #F4F1DE;">
                        <th style="padding: 8px; text-align: left; color: #0077B6; font-size: 14px;">Service</th>
                        <th style="padding: 8px; text-align: center; color: #0077B6; font-size: 14px;">Quantity</th>
                        <th style="padding: 8px; text-align: right; color: #0077B6; font-size: 14px;">Price</th>
                    </tr>
                    ${servicesRows}
                    <tr>
                        <td colspan="2" style="padding: 8px; text-align: right; color: #333; font-size: 14px;"><strong>Total Services:</strong></td>
                        <td style="padding: 8px; text-align: right; color: #333; font-size: 14px;"><strong>$${totalServiceCost.toFixed(2)}</strong></td>
                    </tr>
                </table>

                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 20px 0;">We can’t wait to welcome you to ${booking.resortId.resortName || 'our resort'}! If you have any questions, feel free to contact us.</p>
                <table align="center" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="background-color: #009B77; border-radius: 5px; padding: 12px 24px;">
                            <a href="http://localhost:5173/profile" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold;">View Your Booking</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #0077B6; color: #ffffff; font-size: 12px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                <p style="margin: 0;">&copy; 2025 Booking Resort. All rights reserved.</p>
                <p style="margin: 5px 0;"><a href="http://localhost:5173/" style="color: #F4F1DE; text-decoration: none;">Visit our website</a></p>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};

exports.bookingConfirmationWithPaymentTemplate = (payment) => {
    // Format dates for display
    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });

    const formatDateTime = (date) => new Date(date).toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    // Handle promotion (if available)
    const promotionText = payment.promotionId?.promotionName
        ? `<p style="color: #333; font-size: 14px; line-height: 1.6; margin: 0 0 10px;"><strong>Promotion Applied:</strong> ${payment.promotionId.promotionName}</p>`
        : '';

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #F4F1DE; background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e'); background-size: cover; background-position: center;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: rgba(255, 255, 255, 0.95); border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="padding: 20px 0; text-align: center;">
                <img src="https://via.placeholder.com/150x50?text=Resort+Logo" alt="Resort Logo" style="max-width: 150px;">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <h2 style="color: #0077B6; font-size: 24px; margin: 0 0 10px;">Booking Confirmed, ${payment.userId.userName || 'Guest'}!</h2>
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">We’re thrilled to confirm your booking at ${payment.bookingId.resortId.resortName || 'our resort'}! Your deposit has been successfully processed. Below are the details of your booking and payment.</p>
                
                <h3 style="color: #0077B6; font-size: 18px; margin: 20px 0 10px;">Booking Details</h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; color: #333;">
                    <tr>
                        <td style="padding: 8px 0;"><strong>Resort:</strong></td>
                        <td style="padding: 8px 0;">${payment.bookingId.resortId.resortName || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Location:</strong></td>
                        <td style="padding: 8px 0;">${payment.bookingId.resortId.resortLocation || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Check-In:</strong></td>
                        <td style="padding: 8px 0;">${formatDate(payment.bookingId.checkIn)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Check-Out:</strong></td>
                        <td style="padding: 8px 0;">${formatDate(payment.bookingId.checkOut)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Nights:</strong></td>
                        <td style="padding: 8px 0;">${payment.bookingId.nights || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Guests:</strong></td>
                        <td style="padding: 8px 0;">${payment.bookingId.numberOfGuests || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Booking Total:</strong></td>
                        <td style="padding: 8px 0;">$${payment.bookingId.bookingTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Booking Status:</strong></td>
                        <td style="padding: 8px 0;">${'Confirmed'}</td>
                    </tr>
                </table>

                <h3 style="color: #0077B6; font-size: 18px; margin: 20px 0 10px;">Payment Details</h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; color: #333;">
                    <tr>
                        <td style="padding: 8px 0;"><strong>Deposit Amount:</strong></td>
                        <td style="padding: 8px 0;">$${payment.paymentAmount.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Payment Method:</strong></td>
                        <td style="padding: 8px 0;">${payment.paymentMethod || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Payment Status:</strong></td>
                        <td style="padding: 8px 0;">${payment.paymentStatus || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Payment Date:</strong></td>
                        <td style="padding: 8px 0;">${formatDateTime(payment.createDate)}</td>
                    </tr>
                    ${promotionText}
                    <tr>
                        <td style="padding: 8px 0;"><strong>Description:</strong></td>
                        <td style="padding: 8px 0;">${payment.paymentDescription || 'N/A'}</td>
                    </tr>
                </table>

                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 20px 0;">We’re excited to welcome you to ${payment.bookingId.resortId.resortName || 'our resort'}! If you have any questions or need assistance, please don’t hesitate to contact us.</p>
                <table align="center" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="background-color: #009B77; border-radius: 5px; padding: 12px 24px;">
                            <a href="https://yourresortwebsite.com/bookings" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold;">View Your Booking</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #0077B6; color: #ffffff; font-size: 12px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                <p style="margin: 0;">&copy; 2025 Booking Resort. All rights reserved.</p>
                <p style="margin: 5px 0;"><a href="https://yourresortwebsite.com" style="color: #F4F1DE; text-decoration: none;">Visit our website</a></p>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};

exports.checkOutNotificationTemplate = (booking) => {
    // Format dates for display
    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Check-Out Notification</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #F4F1DE; background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e'); background-size: cover; background-position: center;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: rgba(255, 255, 255, 0.95); border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="padding: 20px 0; text-align: center;">
                <img src="https://via.placeholder.com/150x50?text=Resort+Logo" alt="Resort Logo" style="max-width: 150px;">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <h2 style="color: #0077B6; font-size: 24px; margin: 0 0 10px;">Check-Out Complete, ${booking.userId.userName || 'Guest'}!</h2>
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Thank you for staying at ${booking.resortId.resortName || 'our resort'}! Your check-out has been successfully recorded. To complete your booking, please make the final payment for your stay.</p>
                
                <h3 style="color: #0077B6; font-size: 18px; margin: 20px 0 10px;">Booking Details</h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; color: #333;">
                    <tr>
                        <td style="padding: 8px 0;"><strong>Resort:</strong></td>
                        <td style="padding: 8px 0;">${booking.resortId.resortName || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Location:</strong></td>
                        <td style="padding: 8px 0;">${booking.resortId.resortLocation || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Check-In:</strong></td>
                        <td style="padding: 8px 0;">${formatDate(booking.checkIn)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Check-Out:</strong></td>
                        <td style="padding: 8px 0;">${formatDate(booking.checkOut)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Nights:</strong></td>
                        <td style="padding: 8px 0;">${booking.nights || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Guests:</strong></td>
                        <td style="padding: 8px 0;">${booking.numberOfGuests || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Booking Total:</strong></td>
                        <td style="padding: 8px 0;">$${booking.bookingTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Booking Status:</strong></td>
                        <td style="padding: 8px 0;">${'CheckOut'}</td>
                    </tr>
                </table>

                <h3 style="color: #0077B6; font-size: 18px; margin: 20px 0 10px;">Complete Your Payment</h3>
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">To finalize your booking, please proceed with the payment of $${booking.bookingTotal.toFixed(2)}. Click the button below to make your payment securely.</p>
                <table align="center" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="background-color: #009B77; border-radius: 5px; padding: 12px 24px;">
                            <a href="https://yourresortwebsite.com/payment?bookingId=${booking._id}" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold;">Make Payment Now</a>
                        </td>
                    </tr>
                </table>

                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 20px 0;">We hope you had a wonderful stay at ${booking.resortId.resortName || 'our resort'}! If you have any questions or need assistance with your payment, please contact us.</p>
                <table align="center" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="background-color: #009B77; border-radius: 5px; padding: 12px 24px;">
                            <a href="https://yourresortwebsite.com/contact" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold;">Contact Support</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #0077B6; color: #ffffff; font-size: 12px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                <p style="margin: 0;">&copy; 2025 Booking Resort. All rights reserved.</p>
                <p style="margin: 5px 0;"><a href="http://localhost:5173" style="color: #F4F1DE; text-decoration: none;">Visit our website</a></p>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};

exports.bookingCompletedTemplate = (payment) => {
    // Format dates for display
    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });

    const formatDateTime = (date) => new Date(date).toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    // Handle promotion (if available)
    const promotionText = payment.promotionId?.promotionName
        ? `<p style="color: #333; font-size: 14px; line-height: 1.6; margin: 0 0 10px;"><strong>Promotion Applied:</strong> ${payment.promotionId.promotionName}</p>`
        : '';

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Completed</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #F4F1DE; background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e'); background-size: cover; background-position: center;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: rgba(255, 255, 255, 0.95); border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="padding: 20px 0; text-align: center;">
                <img src="https://via.placeholder.com/150x50?text=Resort+Logo" alt="Resort Logo" style="max-width: 150px;">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <h2 style="color: #0077B6; font-size: 24px; margin: 0 0 10px;">Booking Completed, ${payment.userId.userName || 'Guest'}!</h2>
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Thank you for your stay at ${payment.bookingId.resortId.resortName || 'our resort'}! Your final payment has been successfully processed, and your booking is now completed. Below are the details of your booking and payment.</p>
                
                <h3 style="color: #0077B6; font-size: 18px; margin: 20px 0 10px;">Booking Details</h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; color: #333;">
                    <tr>
                        <td style="padding: 8px 0;"><strong>Resort:</strong></td>
                        <td style="padding: 8px 0;">${payment.bookingId.resortId.resortName || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Location:</strong></td>
                        <td style="padding: 8px 0;">${payment.bookingId.resortId.resortLocation || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Check-In:</strong></td>
                        <td style="padding: 8px 0;">${formatDate(payment.bookingId.checkIn)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Check-Out:</strong></td>
                        <td style="padding: 8px 0;">${formatDate(payment.bookingId.checkOut)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Nights:</strong></td>
                        <td style="padding: 8px 0;">${payment.bookingId.nights || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Guests:</strong></td>
                        <td style="padding: 8px 0;">${payment.bookingId.numberOfGuests || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Booking Total:</strong></td>
                        <td style="padding: 8px 0;">$${payment.bookingId.bookingTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Booking Status:</strong></td>
                        <td style="padding: 8px 0;">${payment.bookingId.bookingStatus || 'Completed'}</td>
                    </tr>
                </table>

                <h3 style="color: #0077B6; font-size: 18px; margin: 20px 0 10px;">Payment Details</h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; color: #333;">
                    <tr>
                        <td style="padding: 8px 0;"><strong>Payment Amount:</strong></td>
                        <td style="padding: 8px 0;">$${payment.paymentAmount.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Payment Method:</strong></td>
                        <td style="padding: 8px 0;">${payment.paymentMethod || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Payment Status:</strong></td>
                        <td style="padding: 8px 0;">${payment.paymentStatus || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Payment Date:</strong></td>
                        <td style="padding: 8px 0;">${formatDateTime(payment.createDate)}</td>
                    </tr>
                    ${promotionText}
                    <tr>
                        <td style="padding: 8px 0;"><strong>Description:</strong></td>
                        <td style="padding: 8px 0;">${payment.paymentDescription || 'N/A'}</td>
                    </tr>
                </table>

                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 20px 0;">We hope you had an amazing experience at ${payment.bookingId.resortId.resortName || 'our resort'}! We’d love to hear your feedback. Please share your thoughts or view your booking details.</p>
                <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                    <tr>
                        <td style="background-color: #009B77; border-radius: 5px; padding: 12px 24px;">
                            <a href="https://yourresortwebsite.com/bookings?bookingId=${payment.bookingId._id}" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold;">View Your Booking</a>
                        </td>
                    </tr>
                </table>
                <table align="center" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="background-color: #009B77; border-radius: 5px; padding: 12px 24px;">
                            <a href="https://yourresortwebsite.com/review?bookingId=${payment.bookingId._id}" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold;">Leave a Review</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #0077B6; color: #ffffff; font-size: 12px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                <p style="margin: 0;">&copy; 2025 Booking Resort. All rights reserved.</p>
                <p style="margin: 5px 0;"><a href="https://yourresortwebsite.com" style="color: #F4F1DE; text-decoration: none;">Visit our website</a></p>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};