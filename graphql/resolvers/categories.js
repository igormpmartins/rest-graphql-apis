const db = require('../../db')
const Category = require('../../models/category')(db)

const getAllCategories = async(parent, params, context) => {
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

module.exports = {
    getAllCategories, createCategory, updateCategory, removeCategory
}