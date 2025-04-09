import express from "express";
import {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController";
import { auth } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", getExperiences);
router.get("/:id", getExperienceById);

// Protected routes
router.post("/", auth, createExperience);
router.put("/:id", auth, updateExperience);
router.delete("/:id", auth, deleteExperience);

export default router;
