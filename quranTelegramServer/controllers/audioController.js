const axios = require('axios');
const Audio = require('../models/audio');

// Fetch updates from Telegram
const fetchUpdates = async (offset, token) => {
  const BASE_URL = `https://api.telegram.org/bot${token}`;
  try {
    const response = await axios.get(`${BASE_URL}/getUpdates?offset=${offset}&limit=20`);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching updates:', error.message);
    return [];
  }
};

// Get audio file URL
const getAudioFileUrl = async (fileId, token) => {
  const BASE_URL = `https://api.telegram.org/bot${token}`;
  try {
    const response = await axios.get(`${BASE_URL}/getFile?file_id=${fileId}`);
    const filePath = response.data.result.file_path;
    return `https://api.telegram.org/file/bot${token}/${filePath}`;
  } catch (error) {
    console.error('Error fetching file URL:', error.message);
    return null;
  }
};

// Fetch and store audios
exports.fetchAndStoreAudios = async (req, res) => {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const lastUpdateId = 0; // Track updates
  // const lastUpdateId = 930278641; // Track updates

  const updates = await fetchUpdates(lastUpdateId, BOT_TOKEN);
  if (updates.length === 0) {
    return res.json({ message: 'No new updates found' });
  }

  const audioPromises = updates
    .filter(update => update.message && update.message.audio)
    .map(async (update) => {
      const audio = update.message.audio;
      const audioUrl = await getAudioFileUrl(audio.file_id, BOT_TOKEN);
      const audioObject = {
        message_id: update.message.message_id,
        audio_id: audio.file_id,
        duration: audio.duration,
        title: audio.title,
        performer: audio.performer,
        file_size: audio.file_size,
        url: audioUrl
      };

      // Save the audio to the database
      const existingAudio = await Audio.findOne({ audio_id: audio.file_id });
      if (!existingAudio) {
        const newAudio = new Audio(audioObject);
        await newAudio.save();
      }
      return audioObject;
    });

  const audioObjects = await Promise.all(audioPromises);
  res.json({ message: 'Audio objects fetched and stored', data: audioObjects });
};

// Retrieve stored audios from the database
exports.getAudios = async (req, res) => {
  try {
    const audios = await Audio.find();
    res.json(audios);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving audios', error: error.message });
  }
};
