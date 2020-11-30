const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 32,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 32,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userInfo: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    purchase: {
        type: Array,
        default: []
    }
}, { timestamps: true})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//static method 
userSchema.statics.authenticate = async function(email, password){
    const user = await this.findOne({ email })
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }else{
            return false
        }
    }else {
        return false
    }
}

const User = mongoose.model('user', userSchema)

module.exports = User