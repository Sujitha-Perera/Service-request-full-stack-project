import mongoose from "mongoose";

const jobRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    contactName: {
      type: String,
      required: true
    },

    contactEmail: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"]
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("JobRequest", jobRequestSchema);