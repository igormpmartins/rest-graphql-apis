const { ApolloError } = require('apollo-server-express')
const db = require('../../db')
const Product = require('../../models/product')(db)

const getAllProducts = async(context, {filter}) => {

    let products = null

    if (filter && filter.categoryId) {
        products = await Product.findAllByCategory(filter.categoryId)
    } else {
        products = await Product.findAll()
    }

    return products

}

const createProduct = async(context, {input}) => {

    const {description, price} = input
    await Product.create([description, price])    

    return {
        description, price
    }
}

const updateProduct = async(context, {id, input}) => {

    const oldProd = await Product.findById(id)
    
    if (!oldProd) {
        throw new ApolloError('could not find product')
    }

    if (input.description) {
        oldProd.description = input.description
    }

    if (input.price) {
        oldProd.price = input.price
    }

    await Product.update(id, [oldProd.description, oldProd.price])

    if (input.categories) {
        try {
            await Product.updateCategories(id, input.categories)
        } catch (error) {
            throw new ApolloError('could not update categories')
        }
        
    }

    return oldProd

}

const removeProduct = async(context, {id}) => {
    await Product.remove(id)
    return true
}


module.exports = {
    getAllProducts, createProduct, updateProduct, removeProduct
}