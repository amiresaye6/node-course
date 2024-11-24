const producsModule = require("../models/products.model")
const getAddPage = (req, res) => {
    res.render('addNewProduct', {isUser: req.session.userId,
        validationErrors: req.flash("validationErrors")})
}
const addNewProduct = async (req, res) => {
    await producsModule.addOneProduct(req.body)
    res.json(req.body)
}

module.exports = {
    getAddPage,
    addNewProduct
}
