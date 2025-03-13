const mongoose = require("mongoose");

const opinionSchema = new mongoose.Schema({
  user: { type: String, required: true },
  content: { type: String, required: true },
  value: { type: Number, default: 0 }, // Value for trading (e.g., sentiment score)
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Opinion", opinionSchema);
