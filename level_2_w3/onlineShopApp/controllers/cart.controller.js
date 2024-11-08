const { validationResult } = require("express-validator");
const cartModule = require("../models/cart.model")

const addNewProductToCart = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validationErrors', errors.array());
        return res.redirect(req.body.redirectTo);
    }
    try {
        const product = req.body;
        await cartModule.addNewProductToCart({ ...product, userId: req.session.userId });
        console.log("Added New Product:", { ...product, userId: req.session.userId });
        return res.redirect('/cart');
    } catch (err) {
        console.error("Error adding product to cart:", err);
        return res.status(500).send("Internal server error");
    }
};


const getAllCartProducts = async (req, res) => {
    const cartItems = await cartModule.getAllCartProducts(req.session.userId)
    res.render('cart', {
        cartItems,
        isUser: true,
        validationErrors: req.flash('validationErrors')
    })
}

const updateCart = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validationErrors', errors.array());
        return res.redirect('/cart');
    }
    try {
        const productUpdates = req.body;
        const result = await cartModule.updateCartProduct(productUpdates)
        console.log(result);

        return res.redirect('/cart')
    } catch (err) {
        console.error("Error deleting product from cart:", err);
        return res.status(500).send("Internal server error");
    }
}

const deleteCartItem = async (req, res) => {
    try {
        const productId = req.body.productId
        console.log(productId);

        const result = await cartModule.deleteCartProduct(productId)
        console.log(result);

        return res.redirect('/cart')
    } catch (err) {
        console.error("Error deleting product from cart:", err);
        return res.status(500).send("Internal server error");
    }
}

const clearAllCartItems = async (req, res) => {
    try {
        await cartModule.deleteAllCartProducts(req.session.userId)
        return res.redirect('/cart')
    } catch (err) {
        console.error("Error clearing your cart:", err);
        return res.status(500).send("Internal server error");
    }
}

module.exports = {
    addNewProductToCart,
    getAllCartProducts,
    updateCart,
    deleteCartItem,
    clearAllCartItems
}
