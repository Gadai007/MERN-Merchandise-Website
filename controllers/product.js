const Product = require('../models/Product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

const getProductById = async (req, res, next, id) => {
    const product = await Product.findById(id).populate('category')
    if (product) {
        req.product = product
        next()
    } else {
        res.status(400).json({ error: 'cannot find a particular product ' })
    }
}

const createProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: 'Problem with image' })
        }

        const { name, description, price, stock, category } = fields
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ error: 'Please enter all fields ' })
        }

        let product = new Product(fields)

        if (file.photo) {
            if (file.photo > 3000000) {
                return res.status(400).json({ error: 'file size too large' })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        product.save((err, product) => {
            if (err) {
                return res.status(400).json({ error: 'failed to save the product' })
            }

            res.status(200).json(product)
        })
    })
}

const getProduct = (req, res) => {
    req.product.photo = undefined
    res.status(200).json(req.product)
}

//middleware
const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType)
        res.send(req.product.photo.data)
    }
    next()
}

const deleteProduct = (req, res) => {
    let product = req.product
    product.remove((err, product) => {
        if (err) {
            return res.status(400).json({ error: 'failed to delete product' })
        }
        res.status(400).json({ message: `successfully deleted product ${product.name}` })
    })
}

const updateProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: 'Problem with image' })
        }

        let product = req.product
        product = _.extend(product, fields)

        if (file.photo) {
            if (file.photo > 3000000) {
                return res.status(400).json({ error: 'file size too large' })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        product.save((err, product) => {
            if (err) {
                return res.status(400).json({ error: 'failed to update product' })
            }

            res.status(200).json(product)
        })
    })
}

const getAllProduct = async (req, res) => {

    const limit = req.query.limit ? parseInt(req.query.limit) : 8
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id'

    const products = await Product.find().limit(limit)
        .sort([[sortBy, 'asc']])
        .select('-photo')
        .populate('category')


    if (products) {
        res.status(200).json(products)
    } else {
        res.status(400).json({ error: 'no products found' })
    }


}

const getAllUniqueCategies = (req, res) => {
    Product.distinct('category', {}, (err, category) => {
        if (err) {
            return res.status(400).json({ error: 'no category found' })
        }
        res.status(200).json(category)
    })
}

const updateStock = (req, res, next) => {
    let myOperations = req.body.products.map(product => {
        return {
            updateOne: {
                filter: { _id: product._id },
                update: { $inc: { stock: -product.count, sold: + product.count } }
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(400).json({ error: 'bulk operation failed' })
        }
        next()
    })
}

module.exports = {
    getProductById,
    createProduct,
    getProduct,
    photo,
    deleteProduct,
    updateProduct,
    getAllProduct,
    getAllUniqueCategies,
    updateStock
}