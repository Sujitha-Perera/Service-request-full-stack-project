import JobRequest from "../models/JobRequest.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await JobRequest.distinct("category");
    categories.sort((a, b) => a.localeCompare(b));

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
