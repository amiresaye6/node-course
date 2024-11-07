const cartModule = require("../models/cart.model")

const addNewProcuctToCart = (req, res) => {
    const product = req.body;
    console.log(product);
    res.json(product)
}


module.exports = {
    addNewProcuctToCart
}
