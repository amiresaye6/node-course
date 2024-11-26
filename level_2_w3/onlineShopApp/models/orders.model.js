const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const cartItemSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    img: String,
    productId: String
}, {
    timestamps: true
});

const orderSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        customarId: {
            type: ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['pending', 'processed', 'shipped', 'delivered', 'cancelled'],
            default: "pending",
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
