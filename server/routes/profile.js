import express from "express";
import Profile from "../models/Profile.js";
import { upload } from "../middleware/upload.js";
import { authenticateToken } from "../middleware/auth.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Get profile (public)
router.get("/", async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Create default profile if none exists
      profile = await Profile.create({
        name: "Your Name",
        title: "Web Developer",
        description: "I create stellar web experiences with modern technologies.",
        aboutDescription: "With over 5 years of experience in web development...",
      });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update profile (admin only)
router.put("/", authenticateToken, upload.single("profilePic"), async (req, res) => {
  try {
    let profile = await Profile.findOne();
    
    const updateData = {
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      aboutDescription: req.body.aboutDescription,
      githubUrl: req.body.githubUrl,
      cvUrl: req.body.cvUrl,
    };

    if (req.file) {
      // Delete old profile picture if exists
      if (profile && profile.profilePic) {
        const oldImagePath = path.join(__dirname, "../uploads", path.basename(profile.profilePic));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.profilePic = `/uploads/${req.file.filename}`;
    }

    if (!profile) {
      profile = await Profile.create(updateData);
    } else {
      Object.assign(profile, updateData);
      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

