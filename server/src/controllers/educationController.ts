import { Request, Response } from "express";
import Education from "../models/Education";

// @desc    Get all educations
// @route   GET /api/education
// @access  Public
export const getEducations = async (req: Request, res: Response) => {
  try {
    const educations = await Education.find().sort({ startDate: -1 });
    res.json(educations);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single education
// @route   GET /api/education/:id
// @access  Public
export const getEducationById = async (req: Request, res: Response) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    res.json(education);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an education
// @route   POST /api/education
// @access  Private/Admin
export const createEducation = async (req: Request, res: Response) => {
  try {
    const {
      title,
      institution,
      location,
      startDate,
      endDate,
      current,
      description,
    } = req.body;

    const education = await Education.create({
      title,
      institution,
      location,
      startDate,
      endDate,
      current: !endDate || endDate?.length === 0 ? true : false,
      description,
    });

    res.status(201).json(education);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an education
// @route   PUT /api/education/:id
// @access  Private/Admin
export const updateEducation = async (req: Request, res: Response) => {
  try {
    const {
      title,
      institution,
      location,
      startDate,
      endDate,
      current,
      description,
    } = req.body;

    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    // Update education fields
    education.title = title || education.title;
    education.institution = institution || education.institution;
    if (location !== undefined) education.location = location;
    education.startDate = startDate || education.startDate;
    if (endDate !== undefined) education.endDate = endDate;
    if (current !== undefined) education.current = current;
    education.description = description || education.description;

    const updatedEducation = await education.save();
    res.json(updatedEducation);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an education
// @route   DELETE /api/education/:id
// @access  Private/Admin
export const deleteEducation = async (req: Request, res: Response) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    await education.deleteOne();
    res.json({ message: "Education removed" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
