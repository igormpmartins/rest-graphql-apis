const init = db => {

    const create = async(data) => {
        const conn = await db
        await conn.query('INSERT INTO categories (category) VALUES (?)', data)
    }

    const update = async(id, data) => {
        const conn = await db
        await conn.query('UPDATE categories SET category = ? WHERE id = ?', [...data, id])
    }

    const remove = async(id) => {
        const conn = await db
        await conn.query('DELETE FROM categories WHERE id =? LIMIT 1', id)
    }

    const findAll = async() => {
        const conn = await db
        const [res] = await conn.query('select * from categories')
        return res
    }
    const findById = async(id) => {
        const conn = await db
        const [res] = await conn.query('select * from categories where id = ?', [id])
        return res
    }

    return {
        create,
        update,
        remove,
        findAll,
        findById
    }

}

module.exports = init