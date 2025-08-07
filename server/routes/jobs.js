import express from "express";
import { body } from "express-validator";
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

const jobValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("company").trim().notEmpty().withMessage("Company is required"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
];

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", protect, adminOnly, jobValidation, createJob);
router.put("/:id", protect, adminOnly, jobValidation, updateJob);
router.delete("/:id", protect, adminOnly, deleteJob);

export default router;
