const router = require('express').Router()
const productController = require('../controllers/product.controllers')

router.get("/:id", productController.getOneProduct)

module.exports = router
