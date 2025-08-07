import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { validationResult } from "express-validator";

export const submitApplication = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { jobId } = req.params;
    const job = await Job.findById(jobId);

    if (!job || !job.isActive) {
      return res.status(404).json({ message: "Job not found" });
    }

    const existingApplication = await Application.findOne({
      jobId,
      email: req.body.email,
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    const application = new Application({
      ...req.body,
      jobId,
    });

    await application.save();
    res
      .status(201)
      .json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId", "title company")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("jobId", "title company");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
