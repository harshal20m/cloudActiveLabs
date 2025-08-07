import Job from "../models/Job.js";
import { validationResult } from "express-validator";

export const getAllJobs = async (req, res) => {
  try {
    const { search, location, type, page = 1, limit = 10 } = req.query;
    const filter = { isActive: true };

    if (search) {
      filter.$text = { $search: search };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (type) {
      filter.type = type;
    }

    const jobs = await Job.find(filter)
      .sort({ postedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("-__v");

    const total = await Job.countDocuments(filter);

    res.json({
      jobs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job || !job.isActive) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const job = new Job(req.body);
    await job.save();

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
