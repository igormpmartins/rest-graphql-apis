const express = require('express')
const router = express.Router()
const rtProducts = require('./products')
const rtCategories = require('./categories')

router.use('/products', rtProducts)
router.use('/categories', rtCategories)

module.exports = router
