import express from "express";
import {
  getJobs,
  getJob,
  createJob,
  updateJobStatus,
  deleteJob
} from "../controllers/jobController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJob);

router.post("/", authMiddleware, createJob);
router.patch("/:id", authMiddleware, updateJobStatus);
router.delete("/:id", authMiddleware, deleteJob);

export default router;