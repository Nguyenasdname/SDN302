const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, unique: true, required: true },
    userPass: { type: String },
    userPhone: { type: String },
    userImg: { type: String },
    userStatus: { type: String, default: 'Active' },
    userRole: { type: String, enum: ['admin', 'employee', 'user'], default: 'user' },
    createDate: { type: Date, default: Date.now },
    userAddress: { type: String },
    userFirstName: { type: String },
    userLastName: { type: String }
})

userSchema.pre('save', async function () {
    if (this.isModified('userPass')) {
        this.userPass = await bcrypt.hash(this.userPass, 10)
    }
})

userSchema.methods.comparePassword = function (plainPassword) {
    return bcrypt.compare(plainPassword, this.userPass)
}

module.exports = mongoose.model('User', userSchema)