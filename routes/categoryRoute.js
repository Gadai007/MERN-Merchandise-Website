const route = require('express').Router()

const {
    getCategoryById,
    createCategory,
    getCategory,
    getAllCategories,
    updateCategory,
    deleteCategory } = require('../controllers/category')
const { getUserById } = require('../controllers/user')
const { isAdmin, isAuthenticated, isSignin } = require('../controllers/auth')


//params
route.param('id', getUserById)
route.param('categoryId', getCategoryById)

//post
route.post('/category/create/:id', isSignin, isAuthenticated, isAdmin, createCategory)

//get
route.get('/category/:categoryId', getCategory)
route.get('/categories', getAllCategories)

//update
route.put('/category/:categoryId/:id', isSignin, isAuthenticated, isAdmin, updateCategory)

//delete
route.delete('/category/:categoryId/:id', isSignin, isAuthenticated, isAdmin, deleteCategory)

module.exports = route