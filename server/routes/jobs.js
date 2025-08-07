import express from "express";
import { body } from "express-validator";
import {
  getAllJobs,
  getAllJobsForAdmin,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  toggleJobStatus,
} from "../controllers/jobController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

const jobValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("company").trim().notEmpty().withMessage("Company is required"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
];

// Public routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Admin routes
router.get("/admin/all", protect, adminOnly, getAllJobsForAdmin);
router.post("/", protect, adminOnly, jobValidation, createJob);
router.put("/:id", protect, adminOnly, jobValidation, updateJob);
router.patch("/:id/toggle-status", protect, adminOnly, toggleJobStatus); // ✅ NEW
router.delete("/:id", protect, adminOnly, deleteJob);

export default router;
