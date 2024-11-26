const mongoose = require("mongoose");
const Order = require("../models/orders.model");
const cartModule = require("../models/cart.model");

const DB_URL = process.env.DB_URL;

// Helper to connect to the database
const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw new Error("Database connection failed.");
    }
};

// Helper to disconnect from the database
const disconnectFromDatabase = async () => {
    try {
        await mongoose.disconnect();
        console.log("Database disconnected.");
    } catch (error) {
        console.error("Error disconnecting from the database:", error);
    }
};

// Create an Order
exports.createOrder = async (req, res) => {
    const { fullName, address, phoneNumber, city, zipCode, paymentMethod, cartItems } = req.body;
    console.log(req.session.userId);
    

    // Validate the input data
    if (!fullName || !address || !phoneNumber || !city || !zipCode || !paymentMethod || !cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: "All fields are required, and the cart must not be empty." });
    }

    try {
        console.log("Received cartItems:", req.body.cartItems);
        let parsedCartItems;
        if (cartItems && Array.isArray(cartItems)) {
            try {
                parsedCartItems = cartItems.map(item => JSON.parse(item)); // Parse each item if it's a string
            } catch (error) {
                return res.status(400).json({ error: "Error parsing cartItems." });
            }
        } else {
            return res.status(400).json({ error: "Cart items are required." });
        }
        // Connect to the database
        await connectToDatabase();

        // Create a new order with cart items from req.body
        const newOrder = new Order({
            fullName,
            customarId: req.session.userId,
            address,
            phoneNumber,
            city,
            zipCode,
            paymentMethod,
            parsedCartItems, // Use cartItems directly from req.body
        });

        const savedOrder = await newOrder.save();

        // Return success response
        return res.redirect('/orders/my_orders')
        // return res.status(201).json({
        //     message: "Order placed successfully!",
        //     order: savedOrder,
        // });
    } catch (err) {
        console.error("Error creating order:", err);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    } finally {
        // Disconnect from the database
        await disconnectFromDatabase();
    }
};



// Get All Orders
exports.getAllOrders = async (req, res) => {
    try {
        await connectToDatabase();

        const orders = await Order.find().sort({ createdAt: -1 });
        await disconnectFromDatabase();

        return res.render("ordersState", {
            orders,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
        })
        return res.status(200).json(orders);
    } catch (err) {
        await disconnectFromDatabase();
        console.error("Error fetching orders:", err);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

// Get All Orders
exports.getMyOrders = async (req, res) => {
    try {
        await connectToDatabase();

        const orders = await Order.find({ customarId: req.session.userId }).sort({ createdAt: -1 });
        await disconnectFromDatabase();

        return res.render("userOrdersStatusPage", {
            orders,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
        })
        return res.status(200).json(orders);
    } catch (err) {
        await disconnectFromDatabase();
        console.error("Error fetching your orders:", err);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

// Get Order by ID
exports.getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        await connectToDatabase();

        const order = await Order.findById(id);
        await disconnectFromDatabase();

        if (!order) {
            return res.status(404).json({ error: "Order not found." });
        }

        return res.status(200).json(order);
    } catch (err) {
        await disconnectFromDatabase();
        console.error("Error fetching order:", err);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        await connectToDatabase();

        const order = await Order.findByIdAndDelete(id);
        await disconnectFromDatabase();

        if (!order) {
            return res.status(404).json({ error: "Order not found." });
        }

        return res.status(200).json({ message: "Order deleted successfully." });
    } catch (err) {
        await disconnectFromDatabase();
        console.error("Error deleting order:", err);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

// Render Orders Page
exports.getOrdersPage = async (req, res) => {
    try {
        const cartItems = await cartModule.getAllCartProducts(req.session.userId);
        res.render("orders", {
            cartItems,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
        });
    } catch (err) {
        console.error("Error fetching cart items for orders page:", err);
        res.status(500).send("Internal server error. Please try again later.");
    }
};




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
