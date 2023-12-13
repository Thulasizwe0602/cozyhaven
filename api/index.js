const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();
const router = express.Router();
const app = express();
const PORT = 3000;
const CORS_OPTIONS = {
  credentials: true,
  origin: 'http://localhost:5173'
};

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors(CORS_OPTIONS));

mongoose.connect(process.env.MONGO_URL);

// Import route files
const userRoute = require('./routes/userRoute');
const profileRoute = require('./routes/profileRoute');
const accomodationRoute = require('./routes/accomodationRoute');
const imageRoute = require('./routes/imageRoute');


app.get('/test', (req, res) => {
  res.json('test number ' + Math.random());
});

// Use route files
app.use('/user', userRoute);
app.use('/profile', profileRoute);
app.use('/accomodation', accomodationRoute);
app.use('/image', imageRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});