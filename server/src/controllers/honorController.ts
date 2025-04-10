import { Request, Response } from "express";
import Honor from "../models/Honor";

// @desc    Get all honors
// @route   GET /api/honors
// @access  Public
export const getHonors = async (req: Request, res: Response) => {
  try {
    const honors = await Honor.find().sort({ date: -1 });
    res.json(honors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single honor
// @route   GET /api/honors/:id
// @access  Public
export const getHonorById = async (req: Request, res: Response) => {
  try {
    const honor = await Honor.findById(req.params.id);

    if (!honor) {
      return res.status(404).json({ message: "Honor not found" });
    }

    res.json(honor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an honor
// @route   POST /api/honors
// @access  Private/Admin
export const createHonor = async (req: Request, res: Response) => {
  try {
    const { title, issuer, date, description, url } = req.body;

    const honor = await Honor.create({
      title,
      issuer,
      date,
      description,
      url,
    });

    res.status(201).json(honor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an honor
// @route   PUT /api/honors/:id
// @access  Private/Admin
export const updateHonor = async (req: Request, res: Response) => {
  try {
    const { title, issuer, date, description, url } = req.body;

    const honor = await Honor.findById(req.params.id);

    if (!honor) {
      return res.status(404).json({ message: "Honor not found" });
    }

    // Update honor fields
    honor.title = title || honor.title;
    honor.issuer = issuer || honor.issuer;
    honor.date = date || honor.date;
    honor.description = description || honor.description;
    if (url !== undefined) honor.url = url;

    const updatedHonor = await honor.save();
    res.json(updatedHonor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an honor
// @route   DELETE /api/honors/:id
// @access  Private/Admin
export const deleteHonor = async (req: Request, res: Response) => {
  try {
    const honor = await Honor.findById(req.params.id);

    if (!honor) {
      return res.status(404).json({ message: "Honor not found" });
    }

    await honor.deleteOne();
    res.json({ message: "Honor removed" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
