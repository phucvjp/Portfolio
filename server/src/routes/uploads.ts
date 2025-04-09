import express from "express";
import {
  upload,
  uploadFile,
  uploadMultipleFiles,
  deleteFile,
} from "../controllers/uploadController";
import { auth } from "../middleware/auth";

const router = express.Router();

// File upload routes
router.post("/", auth, upload.single("file"), uploadFile);
router.post("/multiple", auth, upload.array("files", 10), uploadMultipleFiles);
router.delete("/:filename", auth, deleteFile);

export default router;
