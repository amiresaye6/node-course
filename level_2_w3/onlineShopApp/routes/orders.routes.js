const router = require("express").Router()
const ordersController = require("../controllers/orders.controller");


router.get("/", ordersController.getOrdersPage)
router.post("/", ordersController.getAllOrders)

module.exports = router
