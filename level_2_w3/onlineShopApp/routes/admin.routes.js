const express = require("express");
const multer = require("multer")
const adminController = require("../controllers/admin.controller");
const authGuard = require("../middlewares/auth.guard");

const router = express.Router();


router.get('/add', authGuard.isAdmin, adminController.getAddPage)
router.post('/add', authGuard.isAdmin, multer({
    // this will store the image as an increpted file
    // dest: 'images'
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        // Allow only image files
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 2 * 1024 * 1024 // Limit file size to 2MB
    }
}).single('img'), adminController.addNewProduct)

module.exports = router;
