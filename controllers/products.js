const db = require('../db')
const Product = require('../models/product')(db)

const getAll = async(req, res) => {
    console.log('who?', res.locals)

    let products = null

    if (req.query.categoryId) {
        products = await Product.findAllByCategory(req.query.categoryId)
    } else {
        products = await Product.findAll()
    }

    res.send({products})
}

const getById = async(req, res) => {
    const product = await Product.findById(req.params.id)
    res.send(product)
}

const create = async(req, res) => {
    const {product, price} = req.body
    await Product.create([product, price])

    res.send({
        success: true,
        description: 'create'
    })
}

const createImage = async(req, res) => {
    const {description, url} = req.body
    await Product.addImage(req.params.id, [description, url])
    res.send({
        success: true,
        description: 'create'
    })
}

const remove = async(req, res) => {
    await Product.remove(req.params.id)
    res.send({
        success: true,
        description: 'delete'
    })
}

const removeImage = async(req, res) => {
    await Product.removeImage(req.params.productId, req.params.id)
    res.send({
        success: true,
        description: 'delete image'
    })
}

const put = async(req, res) => {
    const {product, price} = req.body
    await Product.update(req.params.id, [product, price])

    res.send({
        success: true,
        description: 'put'
    })
}

const patch = async(req, res) => {

    const oldProd = await Product.findById(req.params.id)
    
    if (!oldProd) {
        return res.send({
            success: false,
            description: 'could not find product'
        })             
    }

    if (req.body.product) {
        oldProd.description = req.body.product
    }

    if (req.body.price) {
        oldProd.price = req.body.price
    }

    await Product.update(req.params.id, [oldProd.description, oldProd.price])

    if (req.body.categories) {
        try {
            await Product.updateCategories(req.params.id, req.body.categories)
        } catch (error) {
            return res.send({
                success: false,
                description: 'could not update categories'
            })      
        }
        
    }

    res.send({
        success: true,
        description: 'patch'
    })
}

module.exports = {
    getAll,
    getById,
    create,
    createImage,
    remove,
    removeImage,
    put,
    patch
}