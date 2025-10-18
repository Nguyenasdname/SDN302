const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const { OAuth2Client } = require('google-auth-library')
require('dotenv').config()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

exports.generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.userRole }, secret, { expiresIn: '1d' })
}

exports.verifyToken = (token) => {
    return jwt.verify(token, secret)
}

exports.verifyGoogleToken = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    return ticket.getPayload()
}