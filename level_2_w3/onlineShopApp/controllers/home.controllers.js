const productsModel = require("../models/products.model")

const getHome = (req, res) => {
    // get data
    // render home page
    const validCategories = ["men", "women", "both"]
    const category = req.query.category
    if (category && validCategories.includes(category)) {
        productsModel.getProductsByCategory(category).then(products => res.render("index", { products }));
    } else {
        productsModel.getAllProducts().then(products => res.render("index", { products }));
    }
}


module.exports = {
    getHome
}