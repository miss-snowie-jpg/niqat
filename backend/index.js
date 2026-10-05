require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/niqat')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('DB Error:', err));

app.listen(5000, () => console.log('Server running on port 5000'));