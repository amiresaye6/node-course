const userModule = require('../models/users.model');
const { validationResult } = require('express-validator');
const mailer = require("../middlewares/automaticMailer")

const loginPage = (req, res) => {
    const authErr = req.flash('authErr')[0];
    const validationErrors = req.flash('validationErrors');
    res.render("login", {
        authErr,
        validationErrors,
        isAdmin: req.session.isAdmin,
        isUser: req.session.userId
    });
};

const signupPage = (req, res) => {
    const authErr = req.flash('authErr')[0];
    const validationErrors = req.flash('validationErrors');
    res.render("signup", {
        authErr,
        validationErrors,
        isAdmin: req.session.isAdmin,
        isUser: req.session.userId
    });
};

const login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('validationErrors', errors.array());
        return res.redirect('/auth/login');
    }

    try {
        const { email, password } = req.body;

        // Await the login method to ensure it completes before moving on
        const user = await userModule.login(email, password);

        // If user is valid, set session and redirect
        req.session.userId = user._id;
        req.session.isAdmin = user.isAdmin;

        // Redirect to the home page after successful login
        res.redirect('/');

        // Send login notification email (non-blocking)
        const emailSubject = "Login Notification - StickerStore";
        const emailText = `
            Dear ${user.userName || "User"},

            This email is to inform you that a login attempt was made to your StickerStore account.

            Details:
            - Email: ${email}
            - Time: ${new Date().toLocaleString()}

            If this was you, no further action is required. If this was not you, please contact our support team immediately.

            Best regards,
            The StickerStore Team
        `;

        mailer.sendEmail(email, emailSubject, emailText)
            .then(() => console.log("Login notification email sent successfully"))
            .catch((error) => console.error("Failed to send login notification email:", error));

    } catch (error) {
        // Log detailed error and provide a more specific error message in flash
        console.error("Login error:", error);
        req.flash('authErr', 'Login failed: ' + (error.message || 'Unknown error occurred'));
        res.redirect('/auth/login');
    }
};

const signup = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('validationErrors', errors.array());
        return res.redirect('/auth/signup');
    }

    try {
        const { username, email, password } = req.body;

        // Await the signup method to ensure it completes before moving on
        const user = await userModule.signup(username, email, password);

        // Redirect to the login page after successful signup
        res.status(200).redirect('/auth/login');

        // Send welcome email (non-blocking)
        const emailSubject = "Welcome to StickerStore!";
        const emailText = `
            Dear ${username},

            Welcome to ICMS! We're excited to have you on board.

            Your account has been successfully created with the following details:
            - Username: ${username}
            - Email: ${email}

            If you have any questions or need assistance, feel free to reach out to our support team.

            Best regards,
            The StickerStore Team
        `;

        mailer.sendEmail(email, emailSubject, emailText)
            .then(() => console.log("Welcome email sent successfully"))
            .catch((error) => console.error("Failed to send welcome email:", error));

    } catch (error) {
        // Log detailed error and provide a more specific error message in flash
        console.error("Signup error:", error);
        req.flash('authErr', 'Signup failed: ' + (error.message || 'Unknown error occurred'));
        res.redirect('/auth/signup');
    }
};

const logout = (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Session destroy error:", err);
                return res.status(500).send('Failed to log out');
            }
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
};

module.exports = {
    loginPage,
    signupPage,
    login,
    signup,
    logout
};
