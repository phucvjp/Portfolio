import mongoose from "mongoose";

interface IEducation extends mongoose.Document {
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

const EducationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a degree or certification title"],
      trim: true,
    },
    organization: {
      type: String,
      required: [true, "Please provide an institution name"],
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
      required: [true, "Please provide a description"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IEducation>("Education", EducationSchema);
