import express from "express";
import {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController";
import { auth } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", getSkills);
router.get("/:id", getSkillById);

// Protected routes
router.post("/", auth, createSkill);
router.put("/:id", auth, updateSkill);
router.delete("/:id", auth, deleteSkill);

export default router;
