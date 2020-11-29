const User = require('../models/User')
const { validationResult } = require('express-validator')


//route POST
//desc signup an user
const signup = async (req, res) => {

    const errors = await validationResult(req)
    if(!errors.isEmpty()){
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
            err: 'not able to send a user'
        })
    }
}

//route POST
//desc signin an user

const signin = (req, res) => {
    
}

module.exports = {
    signup,
    signin
}