const express = require("express");
require("dotenv").config();
const morgan = require("morgan");

// Session management and auth condition storing
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

const store = new SessionStore({
    uri: process.env.DB_URL,
    collection: "sessions"
});

// Error handling for session store
store.on('error', function(error) {
    console.error("Session store error:", error);
});

app.use(session({
    secret: process.env.SecretKey,
    saveUninitialized: false,
    resave: false, // Prevents unnecessary session saving
    store,
    cookie: {
        httpOnly: true,   // Helps mitigate XSS attacks
        secure: process.env.Environment === 'production', // Use cookies only over HTTPS in production
        sameSite: 'lax'   // Helps prevent CSRF attacks
    }
}));

if (process.env.Environment === 'dev') {
    app.use(morgan('dev'));
}

// Routes
app.use('/', homeRouter);
app.use('/products', productsRoutes);
app.use('/auth', authRoutes);

const port = process.env.Port || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
