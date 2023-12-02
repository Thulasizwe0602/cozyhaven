const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const apiCalls = require('./routers/apiCalls.js');

dotenv.config();

const app = express();
const PORT = 3000;
const CORS_OPTIONS = {
  credentials: true,
  origin: 'http://localhost:5173'
};

app.use(express.json());
app.use(cors(CORS_OPTIONS));

// Connect to MongoDB (uncomment this line once you have the correct URL)
mongoose.connect(process.env.MONGO_URL);

app.get('/test', (request, response) => {
  response.json('test changed 44');
});

// Use the API router
app.use('/', apiCalls);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
