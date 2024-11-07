const express = require('express');
const { check } = require("express-validator");
const userControllers = require('../controllers/user.controller');

const router = express.Router();

const signupValidationRules = [
    check("username")
        .isLength({ min: 3 }).withMessage('Username is required, at least 3 characters'),
    check("email")
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Enter a valid email'),
    check("password")
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    check("confirmPassword")
        .custom((val, { req }) => val === req.body.password)
        .withMessage('Please re-enter the password correctly')
];
const loginValidationRules = [
    check("email")
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Enter a valid email'),
    check("password")
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

router.get('/login', userControllers.loginPage);
router.get('/signup', userControllers.signupPage);
router.post('/login', ...loginValidationRules, userControllers.login);
router.post('/signup', ...signupValidationRules, userControllers.signup);
router.post('/logout', userControllers.logout);

module.exports = router;
