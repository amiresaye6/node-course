const Order = require('../models/orders.model');
const cartModule = require("../models/cart.model")


exports.createOrder = async (req, res) => {
    try {
        const { fullName, address, phoneNumber, city, zipCode, paymentMethod } = req.body;
        const cartItems = await cartModule.getAllCartProducts(req.session.userId)

        // Validate the data
        if (!fullName || !address || !phoneNumber || !city || !zipCode || !paymentMethod) {
            // return res.status(400).json({ error: 'All fields are required.' });
            return res.status(400).json({ fullName, address, phoneNumber, city, zipCode, paymentMethod, parsedCartItems: cartItems });
        }

        // Create the order
        const newOrder = new Order({
            fullName,
            address,
            phoneNumber,
            city,
            zipCode,
            paymentMethod,
            parsedCartItems,
        });

        // Save to the database
        await newOrder.save();

        return res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }); // Sort by newest orders first
        return res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        return res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};


exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        return res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};



// // loads orders page
exports.getOrdersPage = async (req, res) => {
    const cartItems = await cartModule.getAllCartProducts(req.session.userId)
    res.render('orders', {
        cartItems,
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
    });
}

// // gets the orders object
// exports.getAllOrders = async (req, res) => {
//     const cartItems = await cartModule.getAllCartProducts(req.session.userId)
//     res.render('orders', {
//         cartItems,
//         isAdmin: req.session.isAdmin,
//         isUser: req.session.userId
//     });
// }
// exports.confirmOrder = async (req, res) => {
//     const { fullName, address, phoneNumber, city, zipCode, paymentMethod, cartItems } = req.body;
//     const parsedCartItems = cartItems.map(item => JSON.parse(item));
//     res.json({ fullName, address, phoneNumber, city, zipCode, paymentMethod, parsedCartItems })
//     // res.json({items: cartItems})
// }
