const router = require("express").Router()
const orderController = require("../controllers/orders.controller");
const authGuard = require("../middlewares/auth.guard")

// router.get("/", ordersController.getOrdersPage)
// router.post("/", ordersController.getAllOrders)
// router.post("/confirm", ordersController.confirmOrder)
router.post('/', orderController.createOrder);
router.post('/edit_state', authGuard.isAdmin, orderController.editOrderState);
router.delete('/delete/:id', authGuard.isAdmin, orderController.deleteOrder);
router.get('/cofirm', orderController.getOrdersPage);
router.get('/my_orders', orderController.getMyOrders);
router.get('/all', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);

module.exports = router
