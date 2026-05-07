import express from "express";
import Project from "../models/Project.js";
import { upload } from "../middleware/upload.js";
import { authenticateToken } from "../middleware/auth.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Get all projects (public)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create project (admin only)
router.post("/", authenticateToken, upload.single("image"), async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
    };

    if (req.file) {
      projectData.image = `/uploads/${req.file.filename}`;
    }

    const project = await Project.create(projectData);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project (admin only)
router.put("/:id", authenticateToken, upload.single("image"), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const updateData = {
      ...req.body,
      tags: req.body.tags ? JSON.parse(req.body.tags) : project.tags,
    };

    if (req.file) {
      // Delete old image if exists
      if (project.image) {
        const oldImagePath = path.join(__dirname, "../uploads", path.basename(project.image));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image = `/uploads/${req.file.filename}`;
    }

    Object.assign(project, updateData);
    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete project (admin only)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Delete associated image
    if (project.image) {
      const imagePath = path.join(__dirname, "../uploads", path.basename(project.image));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

