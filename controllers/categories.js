const db = require('../db')
const categories = require('../models/category')(db)

const findAll = async(req, res) => {
    const list = await categories.findAll()
    res.send(list)
}

const findById = async(req, res) => {
    const list = await categories.findById(req.params.id)
    res.send(list)
}

const create = async(req, res) => {
    await categories.create([req.body.category])
    res.send({
        success: true,
        category: req.body.category
    })
}

const remove = async(req, res) => {
    await categories.remove(req.params.id)
    res.send({
        success: true
    })
}

const update = async(req, res) => {
    await categories.update (req.params.id, [req.body.category])
    res.send({
        success: true
    })
}

module.exports = {
    findAll,
    findById,
    create,
    remove,
    update
}