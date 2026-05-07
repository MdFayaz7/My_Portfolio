import express from "express";
import Skill from "../models/Skill.js";
import { upload } from "../middleware/upload.js";
import { authenticateToken } from "../middleware/auth.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Get all skills (public)
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create skill (admin only)
router.post("/", authenticateToken, upload.single("icon"), async (req, res) => {
  try {
    const skillData = {
      ...req.body,
    };

    if (req.file) {
      skillData.icon = `/uploads/${req.file.filename}`;
    }

    const skill = await Skill.create(skillData);
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update skill (admin only)
router.put("/:id", authenticateToken, upload.single("icon"), async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      // Delete old icon if exists
      if (skill.icon) {
        const oldImagePath = path.join(__dirname, "../uploads", path.basename(skill.icon));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.icon = `/uploads/${req.file.filename}`;
    }

    Object.assign(skill, updateData);
    await skill.save();

    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete skill (admin only)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }

    // Delete associated icon
    if (skill.icon) {
      const imagePath = path.join(__dirname, "../uploads", path.basename(skill.icon));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

