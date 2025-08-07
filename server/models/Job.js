import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [String],
    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "INR",
      },
    },
    type: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      default: "full-time",
    },
    remote: {
      type: Boolean,
      default: false,
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.index({ title: "text", company: "text", location: "text" });

export default mongoose.model("Job", jobSchema);
