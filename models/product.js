const init = db => {

    const create = async(data) => {
        const conn = await db
        await conn.query('INSERT INTO products (description, price) VALUES (?, ?)', data)
    }

    const addImage = async(productId, data) => {
        const conn = await db
        await conn.query('INSERT INTO images (product_id, description, url) VALUES (?, ?, ?)', [productId, ...data])
    }

    const removeImage = async(productId, id) => {
        const conn = await db
        await conn.query('DELETE FROM images WHERE product_id = ? and id = ? LIMIT 1', [productId, id])
    }

    const update = async(id, data) => {
        const conn = await db
        await conn.query('UPDATE products SET description = ?, price = ? WHERE id = ?', [...data, id])
    }
    
    const updateCategories = async(productId, categories) => {
        const conn = await db

        await conn.query('START TRANSACTION')
        try {

            await conn.query('DELETE FROM categories_products WHERE product_id = ?', [productId])

            for await (categoryId of categories) {
                await conn.query('INSERT INTO categories_products (product_id, category_id) VALUES (?, ?)', [productId, categoryId])
            }

            await conn.query('COMMIT')

        } catch (error) {
            await conn.query('ROLLBACK')
            //console.log('rollback => ', error)
            throw error
        }

    }


    const remove = async(id) => {
        const conn = await db
        await conn.query('DELETE FROM products WHERE id =? LIMIT 1', id)
    }

    const findImages = async(products) => {

        if (products.length === 0) {
            return products
        } else {

            const conn = await db

            const listIds = products.map(item=>item.id).join(',')
            const [imagesDB] = await conn.query(`select * from images where product_id in (${listIds})`)

            const mapImages = imagesDB.reduce((prev, curr)=> {
                return {
                    ...prev,
                    [curr.product_id]:curr
                }
            }, {})

            const productsImg = products.map(prod=> {
                return {
                    ...prod,
                    images: mapImages[prod.id]
                }
            })

            return productsImg

        }

    }

    const findAll = async() => {
        const conn = await db
        const [res] = await conn.query('select * from products')

        const prodImgs = await findImages(res)
        return prodImgs
    }

    const findById = async(id) => {
        const conn = await db
        const [res] = await conn.query('select * from products where id = ' + id)
        const prodImgs = await findImages(res)
        return prodImgs[0]
    }

    const findAllByCategory = async(categoryId) => {
        const conn = await db
        const [res] = await conn.query(`select * from products 
                                        where id in (select product_id from categories_products where category_id = ${categoryId})`)
        const prodImgs = await findImages(res)
        return prodImgs
    }

    const findAllPaginated = async({pageSize = 10, currentPage = 0} = {}) => {
        const conn = await db
        const sql = `select * from products limit ${pageSize * currentPage}, ${pageSize+1}`
        const [res] = await conn.query(sql)

        const hasNext = res.length > pageSize

        if (hasNext) {
            res.pop()
        }

        const prodImgs = await findImages(res)
        return {
            data: prodImgs,
            hasNext
        }

    }

    return {
        create,
        update,
        updateCategories,
        remove,
        addImage,
        removeImage,
        findAll,
        findAllPaginated,
        findAllByCategory,
        findById
    }

}

module.exports = init