import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../uploads");
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// File filter
const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  // Check file type
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Invalid file type! Only images and documents are allowed."));
  }
};

// Setup upload middleware
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// @desc    Upload file
// @route   POST /api/upload
// @access  Private
export const uploadFile = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file;
    const fileUrl = `/uploads/${file.filename}`;

    res.status(201).json({
      message: "File uploaded successfully",
      fileUrl,
      filename: file.filename,
      originalname: file.originalname,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload multiple files
// @route   POST /api/upload/multiple
// @access  Private
export const uploadMultipleFiles = (req: Request, res: Response) => {
  try {
    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Handle array of files
    const files = Array.isArray(req.files)
      ? req.files
      : Object.values(req.files).flat();
    const filesData = files.map((file) => ({
      fileUrl: `/uploads/${file.filename}`,
      filename: file.filename,
      originalname: file.originalname,
    }));

    res.status(201).json({
      message: "Files uploaded successfully",
      files: filesData,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete file
// @route   DELETE /api/upload/:filename
// @access  Private
export const deleteFile = (req: Request, res: Response) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../../uploads", filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    // Delete file
    fs.unlinkSync(filePath);

    res.json({ message: "File deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
