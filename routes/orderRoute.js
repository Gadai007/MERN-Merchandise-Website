const route = require('express').Router()
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user')
const { isSignin, isAuthenticated, isAdmin } = require('../controllers/auth')
const { updateStock } = require('../controllers/product')
const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require('../controllers/order')


//params
route.param('id', getUserById)
route.param('orderId', getOrderById)

//post
route.post('/order/create/:id', isSignin, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder)

//get
route.get('/order/all/:id', isSignin, isAuthenticated, isAdmin, getAllOrders)

//status of order
route.get('/order/status/:id', isSignin, isAuthenticated, isAdmin, getOrderStatus)
route.put('/order/:orderId/status/:id', isSignin, isAuthenticated, isAdmin, updateStatus)




module.exports = route