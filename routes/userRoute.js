const route = require('express').Router()
const { isAdmin, isAuthenticated, isSignin } = require('../controllers/auth')
const { getUser, getUserById } = require('../controllers/user')


route.param('id', getUserById)
route.get('/user/:id', isSignin, isAuthenticated, getUser)

module.exports = route