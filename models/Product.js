const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 32,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    category: {
        type: ObjectId,
        ref: 'category',
        required: true
    },
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true})

const Product = mongoose.model('product', productSchema)

module.exports = Product