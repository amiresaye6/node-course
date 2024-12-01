const producsModule = require("../models/products.model")
const getAddPage = (req, res) => {
    res.render('addNewProduct', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        validationErrors: req.flash("validationErrors")
        
    })
}
const addNewProduct = async (req, res) => {
    const product = await producsModule.addOneProduct({...req.body, img: req.file.filename})
    console.log("obaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", product._id.toString());
    
    res.redirect(`/products/${product._id.toString()}`)
}

module.exports = {
    getAddPage,
    addNewProduct
}
