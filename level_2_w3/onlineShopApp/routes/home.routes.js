const epress = require('express')
const homeController = require("../controllers/home.controllers")

const router = epress.Router()

router.get('/', homeController.getHome)

module.exports = router;
