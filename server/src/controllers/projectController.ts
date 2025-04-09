import { Request, Response } from "express";
import Project from "../models/Project";

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
export const getFeaturedProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({ featured: true }).sort({
      order: 1,
      createdAt: -1,
    });
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      images,
      technologies,
      githubLink,
      demoLink,
      featured,
      order,
    } = req.body;

    const project = await Project.create({
      title,
      description,
      images,
      technologies,
      githubLink,
      demoLink,
      featured,
      order,
    });

    res.status(201).json(project);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      images,
      technologies,
      githubLink,
      demoLink,
      featured,
      order,
    } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update project fields
    project.title = title || project.title;
    project.description = description || project.description;
    project.images = images || project.images;
    project.technologies = technologies || project.technologies;
    project.githubLink = githubLink || project.githubLink;
    project.demoLink = demoLink || project.demoLink;
    project.featured = featured !== undefined ? featured : project.featured;
    project.order = order !== undefined ? order : project.order;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.deleteOne();
    res.json({ message: "Project removed" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
