const router = require("express").Router();
const cartController = require("../controllers/cart.controller")
const authGuard = require("../middlewares/auth.guard");
const check = require("express-validator").check


router.get('/', authGuard.isAuth, cartController.getAllCartProducts);

router.post('/',
    authGuard.isAuth,
    check("amount").isInt({min: 1}).withMessage("Amount must be a NUMBER greater than 0"),
    cartController.addNewProcuctToCart);

router.post('/update', authGuard.isAuth,
    check("amount").isInt({min: 1}).withMessage("Amount must be a NUMBER greater than 0"),
    cartController.updateCart);
router.post('/delete', authGuard.isAuth, cartController.deleteCartItem);
router.post('/clear-cart', authGuard.isAuth, cartController.clearAllCartItems);

module.exports = router
