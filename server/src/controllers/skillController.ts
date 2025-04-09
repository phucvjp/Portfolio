import { Request, Response } from "express";
import Skill from "../models/Skill";

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find().sort({ category: 1, proficiency: -1 });
    res.json(skills);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single skill
// @route   GET /api/skills/:id
// @access  Public
export const getSkillById = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json(skill);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private/Admin
export const createSkill = async (req: Request, res: Response) => {
  try {
    const { name, icon, proficiency, category } = req.body;

    const skill = await Skill.create({
      name,
      icon,
      proficiency,
      category,
    });

    res.status(201).json(skill);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private/Admin
export const updateSkill = async (req: Request, res: Response) => {
  try {
    const { name, icon, proficiency, category } = req.body;

    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    // Update skill fields
    skill.name = name || skill.name;
    if (icon !== undefined) skill.icon = icon;
    if (proficiency !== undefined) skill.proficiency = proficiency;
    skill.category = category || skill.category;

    const updatedSkill = await skill.save();
    res.json(updatedSkill);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    await skill.deleteOne();
    res.json({ message: "Skill removed" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
