const express = require('express')
const router = express.Router()
const controller = require('../controllers/products')

router.get('/', controller.getAll)
router.get('/:id', controller.getById)

router.post('/', controller.create)
router.post('/:id/images', controller.createImage)

router.put('/:id', controller.put)
router.patch('/:id', controller.patch)
router.delete('/:id', controller.remove)
router.delete('/:productId/images/:id', controller.removeImage)

module.exports = router