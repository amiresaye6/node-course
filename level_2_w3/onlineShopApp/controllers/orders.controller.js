const mongoose = require("mongoose");
const Order = require("../models/orders.model");
const cartModule = require("../models/cart.model");
const mailer = require("../middlewares/automaticMailer");

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

    // Validate input data
    if (!fullName || !address || !phoneNumber || !city || !zipCode || !paymentMethod || !cartItems) {
        return res.status(400).json({ error: "All fields are required, and the cart must not be empty." });
    }

    try {
        // Parse cartItems
        let parsedCartItems;
        try {
            parsedCartItems = JSON.parse(cartItems);
        } catch (parseError) {
            console.error("Error parsing cartItems:", parseError);
            return res.status(400).json({ error: "Invalid cart items format." });
        }

        // Validate parsedCartItems
        if (!Array.isArray(parsedCartItems) || parsedCartItems.length === 0) {
            return res.status(400).json({ error: "Cart items must be an array and cannot be empty." });
        }

        // Ensure each item has the required fields
        const isValid = parsedCartItems.every(item =>
            item.name && item.amount && item.price && typeof item.amount === 'number' && typeof item.price === 'number'
        );

        if (!isValid) {
            return res.status(400).json({ error: "Each cart item must have a valid name, amount, and price." });
        }

        console.log("Validated Cart Items:", parsedCartItems);

        // Connect to the database
        await connectToDatabase();

        // Create a new order
        const newOrder = new Order({
            fullName,
            customarId: req.session.userId,
            address,
            phoneNumber,
            city,
            zipCode,
            paymentMethod,
            parsedCartItems, // Save the validated cart items
        });

        await newOrder.save();
        await cartModule.deleteAllCartProducts(req.session.userId);

        // Return success response
        res.redirect('/orders/my_orders');

        // Send order confirmation email (non-blocking)
        const userEmail = req.session.userEmail;
        if (userEmail) {
            const emailSubject = "Order Confirmation - StickerStore";
            const emailText = `
                Dear ${fullName},

                Thank you for your order! We're excited to let you know that your order has been successfully placed.

                Order Details:
                - Order ID: ${newOrder._id}
                - Delivery Address: ${address}, ${city}, ${zipCode}
                - Payment Method: ${paymentMethod}
                - Total Items: ${parsedCartItems.length}

                Items Ordered:
                ${parsedCartItems.map(item => `- ${item.name} (Quantity: ${item.amount}, Price: $${item.price})`).join('\n')}

                If you have any questions or need assistance, feel free to reach out to our support team.

                Best regards,
                The StickerStore Team
            `;

            mailer.sendEmail(userEmail, emailSubject, emailText)
                .then(() => console.log("Order confirmation email sent successfully"))
                .catch((error) => console.error("Failed to send order confirmation email:", error));
        }

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
        // return res.status(200).json(orders);
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
    console.log("botato");
    

    try {
        await connectToDatabase();

        const order = await Order.findByIdAndDelete(id);
        await disconnectFromDatabase();

        if (!order) {
            return res.status(404).json({ error: "Order not found." });
        }

        return res.status(200).json({ message: "Order deleted successfully.", ok: true });
    } catch (err) {
        await disconnectFromDatabase();
        console.error("Error deleting order:", err);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

// Edit state of one order
exports.editOrderState = async (req, res) => {
    try {
        await connectToDatabase();

        await Order.updateOne(
            { _id: req.body.orderId },
            { $set: { status: req.body.status } }
        );
        await disconnectFromDatabase();

        return res.redirect("/orders/all")
    } catch (err) {
        await disconnectFromDatabase();
        console.error("Error fetching your orders:", err);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}

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
