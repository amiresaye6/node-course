const productsModel = require("../models/products.model")

const getHome = (req, res) => {
    // get data
    // render home page
    let productsPromise;
    const validCategories = ["men", "women", "both"]
    const category = req.query.category
    if (category && validCategories.includes(category)) {
        productsPromise = productsModel.getProductsByCategory(category)
    } else {
        productsPromise = productsModel.getAllProducts()
    }
    productsPromise.then(products => res.render("index", {
        products,
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        validationErrors: req.flash('validationErrors')
    }))
    .catch(err => res.json(err));
}

const getLndingPage = (req, res) => {
    res.render('landingPage')
}


module.exports = {
    getHome,
    getLndingPage
}
