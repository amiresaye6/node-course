const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
});

const orderSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        paymentMethod: {
            type: String,
            enum: ['cashOnDelivery', 'creditCard', 'paypal'],
            required: true
        },
        parsedCartItems: [cartItemSchema],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Order', orderSchema);
