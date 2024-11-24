const express = require("express");
const adminController = require("../controllers/admin.controller");
const authGuard = require("../middlewares/auth.guard");

const router = express.Router();


router.get('/add', authGuard.isAdmin, adminController.getAddPage)
router.post('/add', authGuard.isAdmin, adminController.addNewProduct)

module.exports = router;
