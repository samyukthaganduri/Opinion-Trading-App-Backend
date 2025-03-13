// Load environment variables from .env file
require("dotenv").config();

// Import necessary packages
const express = require("express");
const mongoose = require("mongoose");
const WebSocket = require("ws");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("🔥 Opinion Trading App Backend is running smoothly!");
});

const Opinion = require("./models/Opinion");

// POST: Create a new opinion
app.post("/opinions", express.json(), async (req, res) => {
  const { user, content, value } = req.body;

  try {
    const newOpinion = new Opinion({ user, content, value });
    await newOpinion.save();

    console.log("📝 New Opinion Created:", newOpinion);

    // Notify connected WebSocket clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newOpinion));
      }
    });

    res.status(201).json(newOpinion);
  } catch (err) {
    console.error("❌ Error saving opinion:", err);
    res.status(500).json({ error: "Failed to create opinion" });
  }
});

// GET: Fetch all opinions
app.get("/opinions", async (req, res) => {
  try {
    const opinions = await Opinion.find();
    res.json(opinions);
  } catch (err) {
    console.error("❌ Error fetching opinions:", err);
    res.status(500).json({ error: "Failed to fetch opinions" });
  }
});














// Start HTTP server
const server = app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("✅ New client connected!");

  ws.on("message", (message) => {
    console.log(`📩 Received: ${message}`);

    // Broadcast message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => console.log("🔌 Client disconnected"));
});
