const express = require('express')
const router = express.Router()
const controller = require('../controllers/categories')

//crud
router.get('/', controller.findAll)
router.get('/:id', controller.findById)
router.post('/', controller.create)

router.delete('/:id', controller.remove)
router.put('/:id', controller.update)
router.patch('/:id', controller.update)

module.exports = router