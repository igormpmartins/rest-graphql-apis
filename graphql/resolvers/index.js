const {getAllProducts, createProduct, updateProduct, removeProduct} = require('./products')

const resolvers = {
    Query: {
        getAllProducts
    },
    Mutation: {
        createProduct,
        updateProduct,
        removeProduct
    }
}

module.exports = resolvers