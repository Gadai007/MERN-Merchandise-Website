const route = require('express').Router()

const { makePayment} = require('../controllers/payment')


route.post('/payment', makePayment)
module.exports = route