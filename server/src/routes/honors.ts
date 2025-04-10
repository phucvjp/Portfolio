import express from "express";
import {
  getHonors,
  getHonorById,
  createHonor,
  updateHonor,
  deleteHonor,
} from "../controllers/honorController";
import { auth } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", getHonors);
router.get("/:id", getHonorById);

// Protected routes
router.post("/", auth, createHonor);
router.put("/:id", auth, updateHonor);
router.delete("/:id", auth, deleteHonor);

export default router;
