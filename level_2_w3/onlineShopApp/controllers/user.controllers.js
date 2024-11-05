const userModule = require('../models/users.model')

const loginPage = (req, res) => {
    res.render("login");
}

const signupPage = (req, res) => {
    res.render("signup");
}

const login = (req, res) => {
    const { email, password } = req.body;
    userModule.login(email, password)
        .then(user => {
            // Store user ID in session
            req.session.userId = user._id;
            req.session.username = user.username;
            // console.log("sddddddddddddddd", req.session.userId);
            res.redirect('/')
        })
}
const signup = (req, res) => {
    const { username, email, password } = req.body;
    userModule.signup(username, email, password)
        .then(user => {
            res.redirect('/auth/login')
        })
}

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
}

module.exports = {
    loginPage,
    signupPage,
    login,
    signup,
    logout
}
