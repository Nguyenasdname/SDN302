const express = require('express')
const connectDB = require('./config/database')
const cors = require('cors')

const userRouter = require('./modules/user/user.routes')
const authRouter = require('./modules/auth/auth.routes')
const resortRouter = require('./modules/resort/resort.routes')
const serviceResortRouter = require('./modules/serviceResort/serviceResort.routes')
const contactRouter = require('./modules/contact/contact.routes')
const promotionRouter = require('./modules/promotion/promotion.routes')
const wishlistRouter = require('./modules/wishlist/wishlist.routes')
const emailRouter = require('./modules/email/email.routes')
// const feedbackRouter = require('./modules/feedback/feedback.routes')
const bookingRouter = require('./modules/booking/booking.routes')

require('dotenv').config()
connectDB()

const app = express()
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/resort', resortRouter)
app.use('/serviceResort', serviceResortRouter)
app.use('/contact', contactRouter)
app.use('/promotion', promotionRouter)
app.use('/wishlist', wishlistRouter)
app.use('/email/', emailRouter)
app.use('/booking', bookingRouter)
// app.use('/feedback', feedbackRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))