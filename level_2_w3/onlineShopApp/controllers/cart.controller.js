const { validationResult } = require("express-validator");
const cartModule = require("../models/cart.model")

const addNewProcuctToCart = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("++++++++++++++++from /cart.controller.js++++++++++++++++\n", errors.array());
        req.flash('validationErrors', errors.array());
        return res.redirect(req.body.redirectTo);
    }
    try {
        const product = req.body;
        await cartModule.addNewProductToCart({ ...product, userId: req.session.userId });
        console.log({ ...product, userId: req.session.userId });
        return res.redirect('/cart');
    } catch (err) {
        console.error("Error adding product to cart:", err);
        return res.status(500).send("Internal server error");
    }
}


const getAllCartProducts = async (req, res) => {
    const products = await cartModule.getAllCartProducts(req.session.userId)
    res.json(products)
}

module.exports = {
    addNewProcuctToCart,
    getAllCartProducts
}
