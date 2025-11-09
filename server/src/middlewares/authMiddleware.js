const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWT_SECRET

exports.tokenProvider = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) return res.status(403).json({ message: 'No Token Provided' })

    try {
        const decoded = jwt.verify(token, secret)
        req.user = decoded  
        next()
    } catch (err) {
        res.status(401).json({ message: 'Invalid Token' })
    }
}
