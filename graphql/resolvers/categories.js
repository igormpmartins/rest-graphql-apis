const { ApolloError } = require('apollo-server-express')
const db = require('../../db')
const Category = require('../../models/category')(db)

const getAllCategories = async(context) => {
    const categories = await Category.findAll()
    return categories
}

const createCategory = async(context, {input}) => {
    const {category} = input
    await Category.create([category])
    return {
        category
    }
}

const updateCategory = async(context, {id, input}) => {
    const {category} = input
    await Category.update(id, [category])
    return {
        id, 
        category
    }
}

const removeCategory = async(context, {id}) => {
    await Category.remove(id)
    return true
}

/*
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

const createImageOnProduct = async(context, {productId, input}) => {
    const {description, url} = input
    await Product.addImage(productId, [description, url])
    return ({
        product_id: productId,
        description, url
    })
}

const removeImageOnProduct = async(context, {productId, id}) => {
    await Product.removeImage(productId, id)
    return true
}
*/

module.exports = {
    getAllCategories, createCategory, updateCategory, removeCategory
}