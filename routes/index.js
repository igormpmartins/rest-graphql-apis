const express = require('express')
const router = express.Router()
const rtProducts = require('./products')

router.use('/products', rtProducts)

module.exports = router
