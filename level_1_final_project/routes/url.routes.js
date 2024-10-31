const express = require('express')
const { urlPost, urlAllGet, homePageController, urlGet, urlPut, urlDelete, urlDeleteAll } = require("../controllers/url.controllers")

const router = express.Router()

router.get('/', homePageController)
router.get('/all', urlAllGet)
router.get('/:alias', urlGet)
router.post('/', urlPost)
router.put('/:id', urlPut)
router.delete('/', urlDeleteAll)
router.delete('/:id', urlDelete)

module.exports = router;
