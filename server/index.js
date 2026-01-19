const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Temporary in-memory storage for daily check-ins
let checkIns = [];

/**
 * POST /api/checkins
 * Creates a daily self-care check-in
 */
app.post("/api/checkins", (req, res) => {
  const { mood, journal, sleepHours, movement, timestamp } = req.body;

  if (!mood) {
    return res.status(400).json({ message: "Mood is required" });
  }

  const newCheckIn = {
    id: checkIns.length + 1,
    mood,
    journal: journal || "",
    sleepHours: sleepHours || null,
    movement: movement || null,
    timestamp: timestamp || new Date(),
  };

  checkIns.push(newCheckIn);

  res.status(201).json(newCheckIn);
});

/**
 * GET /api/checkins
 * Returns all check-ins
 */
app.get("/api/checkins", (req, res) => {
  res.json(checkIns);
});

// Health check
app.get("/", (req, res) => {
  res.send("Self-Care Insight API is running 🌱");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
