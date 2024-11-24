const mongoose = require("mongoose")

const DB_URL = process.env.DB_URL

const productSchema = mongoose.Schema({
    name: String,
    img: String,
    price: Number,
    description: String,
    category: String
})


const Product = mongoose.model('product', productSchema)

exports.getAllProducts = () => {
    // connec to mongodb
    // get all products
    // disconnect

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                return Product.find({})
            })
            .then(products => {
                mongoose.disconnect()
                resolve(products)
            })
            .catch(err => reject(err))
    })
}

exports.getProductsByCategory = (category) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                return Product.find({ category })
            })
            .then(products => {
                mongoose.disconnect()
                resolve(products)
            })
            .catch(err => reject(err))
    })
}

exports.getOneProduct = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                return Product.findOne({ _id: id })
            })
            .then(product => {
                mongoose.disconnect()
                resolve(product)
            })
            .catch(err => reject(err))
    })
}
exports.addOneProduct = (newProduct) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                return Product.create(newProduct)
            })
            .then(product => {
                mongoose.disconnect()
                resolve(product)
            })
            .catch(err => reject(err))
    })
}
