const route = require('express').Router()
const { isSignin, isAuthenticated } = require('../controllers/auth')
const { getToken, processPayment} = require('../controllers/payment')

route.get('/payment/gettoken/:id', isSignin, isAuthenticated, getToken)
route.post('/payment/braintree/:id', isSignin, isAuthenticated, processPayment)
module.exports = route