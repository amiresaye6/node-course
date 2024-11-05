const userModule = require('../models/users.model');
const validator = require('express-validator').validationResult

const loginPage = (req, res) => {
    const authErr = req.flash('authErr')[0];
    res.render("login", { authErr });
};

const signupPage = (req, res) => {
    const authErr = req.flash('authErr')[0];
    res.render("signup", {authErr});
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModule.login(email, password);
        req.session.userId = user._id;
        res.redirect('/');
    } catch (error) {
        req.flash('authErr', error.message)
        res.redirect('/auth/login');
    }
};

const signup = async (req, res) => {
    try {
        return console.log(validator(req));
        
        const { username, email, password } = req.body;
        await userModule.signup(username, email, password);
        res.status(200).redirect('/auth/login');
    } catch (error) {
        console.log(error);
        req.flash('authErr', error.message)
        res.redirect('/auth/signup');
    }
};

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};

module.exports = {
    loginPage,
    signupPage,
    login,
    signup,
    logout
};
