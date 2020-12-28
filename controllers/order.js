const { Order, ProductCart } = require('../models/Order')

const getOrderById = async (req, res, next, id) => {
    const order = await (await Order.findById(id)).populate('products.product', 'name price')
    if (order) {
        req.order = order
        next()
    } else {
        res.status(400).json({ error: 'order not found in db' })
    }
}

const createOrder = (req, res) => {
    req.body.user = req.profile
    const order = new Order(req.body)
    order.save((err, order) => {
        if(err){
            return res.status(400).json({ error: 'failed to save your order'})
        }
        res.status(200).json(order)
    })
}

const getAllOrders = async (req, res) => {
    const orders = await Order.find().populate('user', '_id name')
    if(orders){
        res.status(200).json(orders)
    }else{
        res.status(400).json({ error: 'no orders found in db'})
    }
}

const getOrderStatus = (req, res) => {
    res.status(200).json(Order.schema.path('status').enumValues)
}

const updateStatus = async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        {_id: req.body.orderId},
        {$set: { status: req.body.status}}
    )

    if(order){
        res.status(200).json(order)
    }else{
        res.status(400).json({ error: 'failed to update your status'})
    }
}

module.exports = {
    getOrderById,
    createOrder,
    getAllOrders,
    getOrderStatus,
    updateStatus
}