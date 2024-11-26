const router = require("express").Router()
const orderController = require("../controllers/orders.controller");


// router.get("/", ordersController.getOrdersPage)
// router.post("/", ordersController.getAllOrders)
// router.post("/confirm", ordersController.confirmOrder)
router.post('/', orderController.createOrder);
router.get('/cofirm', orderController.getOrdersPage);
router.get('/my_orders', orderController.getMyOrders);
router.get('/all', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/delete/:id', orderController.deleteOrder);

module.exports = router
