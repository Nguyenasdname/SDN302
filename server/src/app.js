const express = require('express')
const jwt = require('jsonwebtoken')
const connectDB = require('./config/database')
const bodyParser = require('body-parser')

const userRouter = require('./modules/user/user.routes')
const authRouter = require('./modules/auth/auth.routes')

require('dotenv').config()
connectDB()

const app = express()
app.use(express.json())
// app.use(bodyParser.json())

app.use('/user', userRouter)
app.use('/auth', authRouter)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))