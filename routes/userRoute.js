const route = require('express').Router()
const { isAdmin, isAuthenticated, isSignin } = require('../controllers/auth')
const { getUser, getUserById, updateUser, userPurchaseList } = require('../controllers/user')


route.param('id', getUserById)
route.get('/user/:id', isSignin, isAuthenticated, getUser)
route.put('/user/:id', isSignin, isAuthenticated, updateUser)
route.get('/orders/user/:id', isSignin, isAuthenticated, userPurchaseList)

module.exports = route