// Import necessary modules
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const homeRouter = require('./routes/home.routes');
const productsRoutes = require('./routes/products.routes');
const authRoutes = require("./routes/auth.routes");

// Initialize app and middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", 'ejs');
app.use(express.static('assets'));
app.use(express.static('images'));

// Set up session store
const store = new SessionStore({
    uri: process.env.DB_URL,
    collection: "sessions"
});

// Error handling for session store
store.on('error', (error) => {
    console.error("Session store error:", error);
});

// Session configuration
app.use(session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    store,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
}));

// Logging setup
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/', homeRouter);
app.use('/products', productsRoutes);
app.use('/auth', authRoutes);

// Custom error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
