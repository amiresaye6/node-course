const express = require('express')
const userControllers = require('../controllers/user.controllers')

const router = express.Router();

router.get('/login', userControllers.loginPage);
router.get('/signup', userControllers.signupPage);
router.post('/login', userControllers.login);
router.post('/signup', userControllers.signup);
router.post('/logout', userControllers.logout);

module.exports = router;
