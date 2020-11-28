const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 32,
        trim: true
    }
}, {timestamps: true})

const Category = mongoose.model('category', categorySchema)

module.exports = Category