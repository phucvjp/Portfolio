import express from "express";
import {
  sendContactMessage,
  getContactMessages,
  markAsRead,
  deleteContactMessage,
} from "../controllers/contactController";
import { auth } from "../middleware/auth";

const router = express.Router();

// Public route
router.post("/", sendContactMessage);

// Protected routes
router.get("/", auth, getContactMessages);
router.put("/:id", auth, markAsRead);
router.delete("/:id", auth, deleteContactMessage);

export default router;
