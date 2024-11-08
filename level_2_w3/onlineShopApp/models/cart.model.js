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
                // check if product in user cart or not
                return CartItem.findOne({ userId: data.userId, productId: data.productId }, { amount: 1 });
            })
            .then((itemInCart) => {
                if (itemInCart) {
                    console.log("found item in cart, updating cart item");
                    
                    return CartItem.updateOne(
                        { productId: data.productId, userId: data.userId },
                        { $set: { amount: +data.amount + +itemInCart.amount } }
                    );
                } else {
                    console.log("item not found in cart, adding cart item");
                    let item = new CartItem(data);
                    return item.save();
                }
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

const deleteAllCartProducts = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => CartItem.deleteMany({ userId }))
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

const productInCart = (productId, userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                return CartItem.findOne({ userId, productId }, { amount: 1 });
            })
            .then(product => {
                resolve(product);
            })
            .catch(err => {
                reject(err);
            })
            .finally(() => {
                mongoose.disconnect();
            });
    });
};



module.exports = {
    addNewProductToCart,
    getAllCartProducts,
    updateCartProduct,
    deleteCartProduct,
    deleteAllCartProducts,
    productInCart
}
