const router = require("express").Router()
const orderController = require("../controllers/orders.controller");


// router.get("/", ordersController.getOrdersPage)
// router.post("/", ordersController.getAllOrders)
// router.post("/confirm", ordersController.confirmOrder)
router.post('/', orderController.createOrder);
router.get('/', orderController.getOrdersPage);
// router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/delete/:id', orderController.deleteOrder);

module.exports = router
