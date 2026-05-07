import express from "express";
import Education from "../models/Education.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Get all education (public)
router.get("/", async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1, createdAt: -1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create education (admin only)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update education (admin only)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!education) {
      return res.status(404).json({ error: "Education not found" });
    }
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete education (admin only)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ error: "Education not found" });
    }
    res.json({ message: "Education deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
