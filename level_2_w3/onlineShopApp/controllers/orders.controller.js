const ordersModel = require("../models/orders.model");
const cartModule = require("../models/cart.model")

// loads orders page
exports.getOrdersPage = (req, res) => {
    res.render('orders', {
        cartItems: req.body,
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
    });
}
// exports.getOrdersPage = (req, res) => {
//     const orders = [
//         {
//             id: 'ORD12345',
//             date: '2024-11-08',
//             status: 'Shipped',
//             statusClass: 'bg-success text-light',
//             items: [
//                 { name: 'Product A', quantity: 2, price: 29.99 },
//                 { name: 'Product B', quantity: 1, price: 49.99 }
//             ]
//         },
//         {
//             id: 'ORD67890',
//             date: '2024-11-07',
//             status: 'Processing',
//             statusClass: 'bg-warning text-dark',
//             items: [
//                 { name: 'Product C', quantity: 3, price: 19.99 },
//                 { name: 'Product D', quantity: 1, price: 99.99 }
//             ]
//         }
//     ];

//     res.render('orders', { orders, isUser: req.session.userId });
// }


// gets the orders object
exports.getAllOrders = async (req, res) => {
    const cartItems = await cartModule.getAllCartProducts(req.session.userId)
    res.render('orders', {
        cartItems,
        isAdmin: req.session.isAdmin,
        isUser: req.session.userId
    });
    // res.json({items: cartItems})
}
