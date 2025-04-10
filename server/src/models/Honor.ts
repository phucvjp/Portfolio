import mongoose from "mongoose";

interface IHonor extends mongoose.Document {
  title: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
  createdAt: Date;
  updatedAt: Date;
}

const HonorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide an honor title"],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, "Please provide an issuer name"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Please provide a date"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    url: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IHonor>("Honor", HonorSchema);
