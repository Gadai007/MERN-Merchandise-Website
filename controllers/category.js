const Category = require('../models/Category')


//route PARAMS 
//desc to get a particular category by id
const getCategoryById = async (req, res, next, id) => {
    try {
        const category = await Category.findById(id)
        if (category) {
            req.category = category
            next()
        } else {
            res.status(400).json({ error: 'category not found in db' })
        }
    } catch (err) {
        res.status(400).json({ error: 'error in category controller' }, err)
    }
}


//route POST
//desc create a category by a admin
const createCategory = async (req, res) => {
    const newCategory = new Category(req.body)
    const category = await newCategory.save()
    if (category) {
        res.status(200).json(category)
    } else {
        res.status(400).json({ error: 'cannot create a category' })
    }

}

//route GET
//desc get a category
const getCategory = (req, res) => {
    res.status(200).json(req.category)
}

//route GET
//desc get all categories
const getAllCategories = async (req, res) => {
    const categories = await Category.find()
    if (categories) {
        res.status(200).json(categories)
    } else {
        res.status(400).json({ error: 'no categories found' })
    }
}

//route PUT
//desc update a category

const updateCategory = async (req, res) => {
    const category = await Category.findByIdAndUpdate({ _id: req.category._id }, { $set: req.body }, { new: true,useFindAndModify: false })
    if (category) {
        res.status(200).json(category)
    }else{
        res.status(400).json({ error: 'category update failed'})
    }
}

//route DELETE
//desc delete a category

const deleteCategory = async (req, res) => {

    const category = await Category.findByIdAndDelete(req.category._id)
    if(category){
        res.status(200).json({ message: `Successfully deleted ${category.name}`})
    }else{
        res.status(400).json({ error: 'failed to delete a a category'})
    }
}

module.exports = {
    getCategoryById,
    createCategory,
    getCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}