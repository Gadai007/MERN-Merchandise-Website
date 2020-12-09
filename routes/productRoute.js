const route = require('express').Router()
const {
    getProductById,
    createProduct,
    getProduct,
    photo,
    deleteProduct,
    updateProduct,
    getAllProduct,
    getAllUniqueCategies } = require('../controllers/product')
const { getUserById } = require('../controllers/user')
const { isSignin, isAuthenticated, isAdmin } = require('../controllers/auth')

//params
route.param('id', getUserById)
route.param('productId', getProductById)

//post
route.post('/product/create/:id', isSignin, isAuthenticated, isAdmin, createProduct)

//get
route.get('/product/:productId', getProduct)
route.get('/product/photo/:productId', photo)

//delete 
route.delete('/product/:productId/:id', isSignin, isAuthenticated, isAuthenticated, deleteProduct)

//update
route.put('/product/:productId/:id', isSignin, isAuthenticated, isAdmin, updateProduct)

//limiting route
route.get('/products', getAllProduct)
route.get('/products/categories', getAllUniqueCategies)
module.exports = route