import mongoose from "mongoose";

interface IProject extends mongoose.Document {
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a project title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a project description"],
    },
    images: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      required: [true, "Please specify at least one technology used"],
    },
    githubLink: {
      type: String,
    },
    demoLink: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
