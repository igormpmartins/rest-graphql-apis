const {getAllProducts, createProduct, updateProduct, removeProduct,  createImageOnProduct, removeImageOnProduct} = require('./products')
const {getAllCategories, createCategory, updateCategory, removeCategory} = require('./categories')
const { AuthenticationError } = require('apollo-server-express')

const checkAuth = resolver => {
    return async(parent, params, context) => {

        if (!context.user) {
            throw new AuthenticationError('user not authorized - resolver')
        }

        return resolver(parent, params, context)
    }
}

const resolvers = {
    Query: {
        getAllProducts: checkAuth(getAllProducts), 
        getAllCategories: checkAuth(getAllCategories)
    },
    Mutation: {
        createProduct,
        updateProduct,
        removeProduct,
        createImageOnProduct, 
        removeImageOnProduct,
        createCategory,
        updateCategory,
        removeCategory
    }
}

module.exports = resolvers