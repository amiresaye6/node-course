const userModule = require('../models/users.model');

const loginPage = (req, res) => {
    res.render("login");
};

const signupPage = (req, res) => {
    res.render("signup");
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModule.login(email, password);
        req.session.userId = user._id;
        res.redirect('/');
    } catch (error) {
        res.status(400).send("Invalid email or password");
    }
};

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await userModule.signup(username, email, password);
        res.status(200).redirect('/auth/login');
    } catch (error) {
        console.log(err);
        res.status(400).send("Signup failed: " + error.message);
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
