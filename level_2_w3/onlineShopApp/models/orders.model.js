const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Canceled'],
        default: 'Processing'
    },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentDetails: {
        method: {
            type: String,
            enum: ['Credit Card', 'PayPal', 'Cash on Delivery'],
            required: true
        },
        transactionId: {
            type: String,
            required: function () { return this.paymentDetails.method !== 'Cash on Delivery'; }
        }
    }
}, {
    timestamps: true
});



// CRUD Methods

// Create Order
orderSchema.statics.createOrder = async function (orderData) {
    try {
        const newOrder = new this(orderData);
        return await newOrder.save();
    } catch (error) {
        throw error;
    }
};

// Get Order by ID
orderSchema.statics.getOrderById = async function (orderId) {
    try {
        return await this.findById(orderId).populate('userId', 'name').populate('items.productId', 'name price');
    } catch (error) {
        throw error;
    }
};

// Update Order Status
orderSchema.statics.updateOrderStatus = async function (orderId, newStatus) {
    try {
        return await this.findByIdAndUpdate(
            orderId,
            { status: newStatus, updatedAt: Date.now() },
            { new: true }
        );
    } catch (error) {
        throw error;
    }
};

// Delete Order
orderSchema.statics.deleteOrder = async function (orderId) {
    try {
        return await this.findByIdAndDelete(orderId);
    } catch (error) {
        throw error;
    }
};

// Get Orders by User ID
orderSchema.statics.getOrdersByUserId = async function (userId) {
    try {
        return await this.find({ userId }).populate('items.productId', 'name price');
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('Order', orderSchema);
