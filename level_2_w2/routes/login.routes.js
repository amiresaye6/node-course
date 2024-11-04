const express = require("express");
const { query } = require('express-validator');
const loginControllers = require("../controllers/login.controllers")

const router = express.Router()

router.get("/", loginControllers.loginLoad)
router.post("/login", query('person').notEmpty().escape(), loginControllers.loginPost)

module.exports = router;
