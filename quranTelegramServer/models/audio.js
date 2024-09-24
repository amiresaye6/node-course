const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  message_id: Number,
  audio_id: String,
  duration: Number,
  title: String,
  performer: String,
  file_size: Number,
  url: String
});

module.exports = mongoose.model('Audio', audioSchema);
