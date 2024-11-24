const producsModule = require("../models/products.model")
const getAddPage = (req, res) => {
    res.render('addNewProduct', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        validationErrors: req.flash("validationErrors")
        
    })
}
const addNewProduct = async (req, res) => {
    await producsModule.addOneProduct({...req.body, img: req.file.filename})
    res.json(req.body)
}

module.exports = {
    getAddPage,
    addNewProduct
}
