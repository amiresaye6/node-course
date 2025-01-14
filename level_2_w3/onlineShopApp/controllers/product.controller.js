const productsModel = require("../models/products.model")

const getOneProduct = (req, res) => {
    const id = req.params.id;
    productsModel.getOneProduct(id)
        .then(product => res.render('product', {
            product,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            validationErrors: req.flash("validationErrors")
        }))
}


module.exports = {
    getOneProduct
}
