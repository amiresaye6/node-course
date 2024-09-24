const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audioController');

// Route to fetch and store audios from Telegram
router.get('/get/audio', audioController.fetchAndStoreAudios);

// Route to retrieve stored audios from the database
router.get('/audio', audioController.getAudios);

module.exports = router;
