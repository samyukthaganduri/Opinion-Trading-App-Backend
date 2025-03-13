// Load environment variables
require('dotenv').config();

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const WebSocket = require('ws');

// Initialize app and configuration
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware setup
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Define Opinion Schema and Model
const opinionSchema = new mongoose.Schema({
  user: { type: String, required: true },
  opinion: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});
const Opinion = mongoose.model('Opinion', opinionSchema);

// POST route to submit opinions
app.post('/api/opinions', async (req, res) => {
  console.log('📩 Incoming request body:', req.body);

  const { user, opinion } = req.body;
  if (!user || !opinion) {
    return res.status(400).json({ message: 'User and opinion are required' });
  }

  try {
    const newOpinion = new Opinion({ user, opinion });
    await newOpinion.save();
    res.status(201).json({ message: '✅ Opinion added successfully!', data: newOpinion });
  } catch (err) {
    res.status(500).json({ message: '❌ Error saving opinion', error: err.message });
  }
});

// GET route to fetch all opinions
app.get('/api/opinions', async (req, res) => {
  try {
    const opinions = await Opinion.find();
    res.json(opinions);
  } catch (err) {
    res.status(500).json({ message: '❌ Error fetching opinions', error: err.message });
  }
});

// WebSocket setup
const server = app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('🔌 New WebSocket connection');

  ws.on('message', (message) => {
    console.log(`📩 Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.send('👋 Welcome to the WebSocket server!');
});
