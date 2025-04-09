import mongoose from "mongoose";

interface IExperience extends mongoose.Document {
  title: string;
  organization: string;
  location?: string;
  from: string;
  to?: string;
  current: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a job title"],
      trim: true,
    },
    organization: {
      type: String,
      required: [true, "Please provide an organization name"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    from: {
      type: String,
      required: [true, "Please provide a start date"],
    },
    to: {
      type: String,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, "Please provide a job description"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IExperience>("Experience", ExperienceSchema);
