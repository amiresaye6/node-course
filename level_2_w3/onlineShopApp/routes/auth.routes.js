const express = require('express')
const userControllers = require('../controllers/user.controllers')
const check = require("express-validator").check


const router = express.Router();

router.get('/login', userControllers.loginPage);
router.get('/signup', userControllers.signupPage);
router.post('/login', userControllers.login);
router.post('/signup',
    check("username")
        .isLength({ min: 3 }).withMessage('Username is required, at least 3 characters'),
    check("email")
        .not().isEmpty().withMessage('Email is required')
        .isEmail().withMessage('Enter a valid email'),
    check("password")
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    check("confirmPassword")
        .custom((val, { req }) => {
            if (val === req.body.password) {
                return true;
            } else {
                throw new error("please re enter password correctly")
            }
        }).withMessage('please re enter password correctly'),
    userControllers.signup);
router.post('/logout', userControllers.logout);

module.exports = router;
