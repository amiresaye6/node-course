const mongoose = require("mongoose");


const DB_URL = process.env.DB_URL;

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    img: String,
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
                let products = CartItem.find({ userId: id }, {}, { sort: { updatedAt: -1 } });
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

const updateCartProduct = productUpdates => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                return CartItem.updateOne(
                    { productId: productUpdates.productId },
                    { $set: { amount: productUpdates.amount } } 
                );
            })
            .then((result) => {
                mongoose.disconnect();
                resolve(result)
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            })
    })
}

const deleteCartProduct = productId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => CartItem.deleteOne({ productId }))
            .then((result) => {
                mongoose.disconnect();
                resolve(result);
            })
            .catch(err => {

                mongoose.disconnect();
                reject(err);
            })
    })
}



module.exports = {
    addNewProductToCart,
    getAllCartProducts,
    updateCartProduct,
    deleteCartProduct
}
