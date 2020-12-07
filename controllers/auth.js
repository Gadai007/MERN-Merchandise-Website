const User = require('../models/User')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')



const createToken = (id) => {
    return jwt.sign({ id }, process.env.mySecret, { expiresIn: 3 * 24 * 60 * 60 })
}

//route POST
//desc signup an user
const signup = async (req, res) => {

    const errors = await validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }

    const newUser = new User(req.body)
    const user = await newUser.save()
    if (user) {
        res.status(200).json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    } else {
        res.status(400).json({
            err: 'not able to save a user'
        })
    }
}

//route POST
//desc signin an user

const signin = async (req, res) => {
    const errors = await validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(401).json({
            error: errors.array()[0].msg
        })
    }

    const { email, password } = req.body
    try {
        const user = await User.authenticate(email, password)
        if (user) {
            const token = createToken(user._id)
            res.cookie('token', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 })
            res.status(200).json({
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            })
        } else {
            res.status(401).json({
                error: 'please check your email or password'
            })
        }
    } catch (err) {
        res.status(401).json({ error: 'please check your email or password' }, err)
    }

}

//route GET
//desc signout an user
const signout = (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ message: 'user signout successful' })
}

//protected routes
const isSignin = (req, res, next) => {
    const token = req.cookies.token
    if(token){
        jwt.verify(token, process.env.mySecret, async (err, decodedToken) => {
            if(err){
                return res.status(400).json({ 
                    error: 'unauthorized token'
                })
            }
            req.auth = decodedToken
            next()
        })
    }else{
        res.status(400).json({
            error: 'Token not found'
        })
    }
}

//custom middleware
const isAuthenticated = (req, res, next) => {

    /* profile is being set up from the frontend (REACT) and auth is being set up from isSignin */
    let checker = req.profile && req.auth && req.profile._id == req.auth.id
    if (!checker) {
        return res.status(403).json({
            error: 'Access denied'
        })
    }
    next()
}

const isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({ 
            error: 'You are not an admin'
        })
    }
    next()
}

module.exports = {
    signup,
    signin,
    signout,
    isSignin,
    isAuthenticated,
    isAdmin
}