const app = require('./app');
const connectDB = require('./config/config');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
