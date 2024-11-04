const userModule = require('../models/users.model')

const loginPage = (req, res) => {
    res.render("login");
}

const signupPage = (req, res) => {
    res.render("signup");
}

const login = (req, res) => {
    const {email, password} = req.body;
    userModule.login(email, password)
    .then(user => res.json(user) )
}
const signup = (req, res) => {
    const {username, email, password} = req.body;
    userModule.signup(username, email, password)
    .then(user => res.json(user) )
}

module.exports = {
    loginPage,
    signupPage,
    login,
    signup
}
