const mongoose = require("mongoose");


const DB_URL = process.env.DB_URL;

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String
}, {
    timestamps: true
});


const CartItem = mongoose.model("cart", cartSchema);

const addNewProductToCart = data => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            let item = new CartItem(data);
            return item.save();
        })
        .then(() => {
            mongoose.disconnect();
            resolve();
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}


const getAllCartProducts = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            let products = CartItem.find({userId: id});
            return products
        })
        .then((products) => {
            mongoose.disconnect();
            resolve(products);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}


module.exports = {
    addNewProductToCart,
    getAllCartProducts
}
