const User = require('../models/User')
const { Order } = require('../models/Order')

const getUserById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id)
        if (user) {
            req.profile = user
            next()
        } else {
            res.status(400).json({
                error: 'User not found'
            })
        }
    } catch (err) {
        res.status(400).json({
            error: 'somethings wrong check user route'
        }, err)
    }
}

const getUser = (req, res) => {
    req.profile.password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    res.status(200).json(req.profile)
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.profile._id },
            { $set: req.body },
            { new: true, useFindAndModify: false })
        if (user) {
            user.password = undefined
            user.createdAt = undefined
            user.updatedAt = undefined
            res.status(200).json(user)
        } else {
            res.status(400).json({ error: 'user update failed' })
        }
    } catch (err) {
        res.status(400).json({ error: 'error check updateUser ' }, err)
    }
}

const userPurchaseList = async (req, res) => {
    const order = await Order.find({ user: req.profile._id }).populate('user', '_id name')
    if (order) {
        res.status(200).json(order)
    } else {
        res.status(400).json({ error: 'no purchase available' })
    }
}

//middleware
const pushOrderInPurchaseList = (req, res, next) => {
    let purchases = []
    req.body.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.amount,
            transaction_id: req.body.transaction_id
        })
    })

    User.findOneAndUpdate(
        { _id: req.profile._id },
        {$push: {purchases: purchases}},
        {new: true}, (err) => {
            if(err){
                return res.status(400).json({ error: 'unable to update the purchase list'})
            }
            next()
        })
}

module.exports = {
    getUserById,
    getUser,
    updateUser,
    userPurchaseList,
    pushOrderInPurchaseList
}