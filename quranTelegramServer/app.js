const express = require('express');
const cors = require('cors');
const audioRoutes = require('./routes/audioRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', audioRoutes);

module.exports = app;
