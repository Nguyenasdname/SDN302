const express = require('express')
const jwt = require('jsonwebtoken')
const connectDB = require('./config/database')
const bodyParser = require('body-parser')

const userRouter = require('./modules/user/user.routes')
const authRouter = require('./modules/auth/auth.routes')
const resortRouter = require('./modules/resort/resort.routes')
const serviceResortRouter = require('./modules/serviceResort/serviceResort.routes')
const contactRouter = require('./modules/contact/contact.routes')
const promotionRouter = require('./modules/promotion/promotion.routes')
const wishlist = require('./modules/wishlist/wishlist.routes')

require('dotenv').config()
connectDB()

const app = express()
app.use(express.json())
// app.use(bodyParser.json())

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/resort', resortRouter)
app.use('/serviceResort', serviceResortRouter)
app.use('/contact', contactRouter)
app.use('/promotion', promotionRouter)
app.use('/wishlist', wishlist)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))