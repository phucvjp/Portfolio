import { Request, Response } from "express";
import Experience from "../models/Experience";

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
export const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.json(experiences);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single experience
// @route   GET /api/experience/:id
// @access  Public
export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.json(experience);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an experience
// @route   POST /api/experience
// @access  Private/Admin
export const createExperience = async (req: Request, res: Response) => {
  try {
    const {
      title,
      organization,
      location,
      startDate,
      endDate,
      current,
      description,
    } = req.body;

    const experience = await Experience.create({
      title,
      organization,
      location,
      startDate,
      endDate,
      current,
      description,
    });

    res.status(201).json(experience);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an experience
// @route   PUT /api/experience/:id
// @access  Private/Admin
export const updateExperience = async (req: Request, res: Response) => {
  try {
    const {
      title,
      organization,
      location,
      startDate,
      endDate,
      current,
      description,
    } = req.body;

    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Update experience fields
    experience.title = title || experience.title;
    experience.organization = organization || experience.organization;
    if (location !== undefined) experience.location = location;
    experience.startDate = startDate || experience.startDate;
    if (endDate !== undefined) experience.endDate = endDate;
    if (current !== undefined) experience.current = current;
    experience.description = description || experience.description;

    const updatedExperience = await experience.save();
    res.json(updatedExperience);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an experience
// @route   DELETE /api/experience/:id
// @access  Private/Admin
export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    await experience.deleteOne();
    res.json({ message: "Experience removed" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
