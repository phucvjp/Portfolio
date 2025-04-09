import express from "express";
import {
  getEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController";
import { auth } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", getEducations);
router.get("/:id", getEducationById);

// Protected routes
router.post("/", auth, createEducation);
router.put("/:id", auth, updateEducation);
router.delete("/:id", auth, deleteEducation);

export default router;
