const userModule = require('../models/users.model');
const { validationResult } = require('express-validator');

const loginPage = (req, res) => {
    const authErr = req.flash('authErr')[0];
    const validationErrors = req.flash('validationErrors');
    res.render("login", { authErr, validationErrors, isUser: req.session.userId });
};

const signupPage = (req, res) => {
    const authErr = req.flash('authErr')[0];
    const validationErrors = req.flash('validationErrors');
    res.render("signup", { authErr, validationErrors, isUser: req.session.userId });
};

const login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('validationErrors', errors.array());
        return res.redirect('/auth/login');
    }

    try {
        const { email, password } = req.body;
        // console.log("first+++++++++++++++++", email, password)
        
        // Await the login method to ensure it completes before moving on
        const user = await userModule.login(email, password);
        // console.log("second+++++++++++++++++", user)
        
        // If user is valid, set session and redirect
        req.session.userId = user._id;
        req.session.isAdmin = user.isAdmin;
        
        // console.log("third+++++++++++++++++", req.session.userId)
        res.redirect('/');
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
        await userModule.signup(username, email, password);
        res.status(200).redirect('/auth/login');
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
