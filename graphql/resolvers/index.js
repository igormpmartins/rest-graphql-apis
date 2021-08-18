const {getAllProducts, createProduct, updateProduct, removeProduct,  createImageOnProduct, removeImageOnProduct} = require('./products')
const {getAllCategories, createCategory, updateCategory, removeCategory} = require('./categories')

const resolvers = {
    Query: {
        getAllProducts,
        getAllCategories
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