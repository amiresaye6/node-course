const productsModel = require("../models/products.model")

const getHome = async (req, res) => {
    try {
        // Get category from query
        const category = req.query.category
        
        // Fetch products based on category
        const products = category 
            ? await productsModel.getProductsByCategory(category)
            : await productsModel.getAllProducts()
        
        // Get unique categories
        const allProducts = await productsModel.getAllProducts()
        const uniqueCategories = [...new Set(
            allProducts
                .map(product => product.category?.toLowerCase())
                .filter(Boolean)
        )].sort()

        res.render("index", {
            products,
            uniqueCategories,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            validationErrors: req.flash('validationErrors')
        })
    } catch (err) {
        res.json(err)
    }
}

const getLndingPage = (req, res) => {
    res.render('landingPage')
}

module.exports = {
    getHome,
    getLndingPage
}
