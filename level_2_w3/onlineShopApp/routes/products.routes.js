const router = require('express').Router()
const productController = require('../controllers/product.controller')

router.get("/:id", productController.getOneProduct)

module.exports = router
