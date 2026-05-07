import express from "express";
import Experience from "../models/Experience.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Get all experiences (public)
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create experience (admin only)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update experience (admin only)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!experience) {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete experience (admin only)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
