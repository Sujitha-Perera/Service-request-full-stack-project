import JobRequest from "../models/JobRequest.js";

const ALLOWED_STATUSES = ["Open", "In Progress", "Closed"];

// GET ALL JOBS
export const getJobs = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.keyword) {
      filter.$or = [
        {
          title: {
            $regex: req.query.keyword,
            $options: "i",
          },
        },
        {
          description: {
            $regex: req.query.keyword,
            $options: "i",
          },
        },
      ];
    }

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE JOB
export const getJob = async (req, res) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE JOB (AUTH REQUIRED)
export const createJob = async (req, res) => {
  try {
    const job = await JobRequest.create({
      ...req.body,
      createdBy: req.user._id, // Changed from req.user.id to req.user._id
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE JOB STATUS (AUTH REQUIRED)
export const updateJobStatus = async (req, res) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if user is the owner
    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not allowed to update this job",
      });
    }

    if (!ALLOWED_STATUSES.includes(req.body.status)) {
      return res.status(400).json({
        message: "Invalid status. Allowed: Open, In Progress, Closed.",
      });
    }

    job.status = req.body.status;
    await job.save();

    res.status(200).json(job);
  } catch (error) {
    console.error("Update job status error:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE JOB (ONLY OWNER, AUTH REQUIRED)
export const deleteJob = async (req, res) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if user is the owner
    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not allowed to delete this job",
      });
    }

    await JobRequest.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Delete job error:", error);
    res.status(500).json({ message: error.message });
  }
};
