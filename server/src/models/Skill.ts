import mongoose from "mongoose";

interface ISkill extends mongoose.Document {
  name: string;
  icon?: string;
  proficiency: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a skill name"],
      trim: true,
    },
    icon: {
      type: String,
    },
    proficiency: {
      type: Number,
      required: [true, "Please provide a proficiency level"],
      min: 1,
      max: 5,
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISkill>("Skill", SkillSchema);
