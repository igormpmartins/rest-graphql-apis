const getAllProducts = () => {
    return [{
        id: '123',
        name: 'descr'
    }]
}

const createProduct = (context, {input}) => {
    const {id, name} = input
    console.log(id, name)
    return {
        id: '321',
        name: 'outra descr'
    }
}

module.exports = {
    getAllProducts, createProduct
}