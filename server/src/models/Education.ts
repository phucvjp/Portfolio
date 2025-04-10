import mongoose from "mongoose";

interface IEducation extends mongoose.Document {
  title: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a degree or certification title"],
      trim: true,
    },
    institution: {
      type: String,
      required: [true, "Please provide an institution name"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    startDate: {
      type: String,
      required: [true, "Please provide a start date"],
    },
    endDate: {
      type: String,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IEducation>("Education", EducationSchema);
