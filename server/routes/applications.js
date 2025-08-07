import express from "express";
import { body } from "express-validator";
import {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  getMyApplications,
} from "../controllers/applicationController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

const applicationValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("resumeUrl").isURL().withMessage("Valid resume URL is required"),
];

router.post("/:jobId", applicationValidation, submitApplication);
router.get("/", protect, adminOnly, getApplications);
router.get("/my/:email", getMyApplications); // Add this route
router.patch("/:id/status", protect, adminOnly, updateApplicationStatus);

export default router;
