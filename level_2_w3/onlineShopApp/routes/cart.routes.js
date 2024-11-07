const router = require("express").Router();
const cartController = require("../controllers/cart.controller")
const authGuard = require("../middlewares/auth.guard");
const check = require("express-validator").check


router.post('/',
    authGuard.isAuth,
    check("amount").isInt({min: 1}).withMessage("Amount must be a NUMBER greater than 0"),
    cartController.addNewProcuctToCart);

router.get('/', authGuard.isAuth, cartController.getAllCartProducts);

module.exports = router
