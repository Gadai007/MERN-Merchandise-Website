const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const productCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'product'
    },
    name: String,
    count: Number,
    price: Number
})

const orderSchema = new mongoose.Schema({
    products: [productCartSchema],
    transaction_id: {},
    amount: Number,
    address: String,
    updated: Date,
    user: {
        type: ObjectId,
        ref: 'user'
    }
}, {timestamps: true})

const ProductCart = mongoose.model('productCart', productCartSchema)

const Order = mongoose.model('order', orderSchema)

module.exports = {
    Order,
    ProductCart
}