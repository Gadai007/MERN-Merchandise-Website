const route = require('express').Router()
const { check } = require('express-validator')
const { signup, signin, signout } = require('../controllers/auth')


route.post('/signup', [
    check('name', 'name should be atleast three characters').isLength({ min: 3 }),
    check('email', 'enter valid email').isEmail(),
    check('password', 'password should be atleast three characters').isLength({ min: 3 }),
], signup)

route.post('/signin', [
    check('email', 'enter valid email').isEmail(),
    check('password', 'enter a valid password').isLength({ min: 1 }),
], signin)

route.get('/signout', signout )

module.exports = route