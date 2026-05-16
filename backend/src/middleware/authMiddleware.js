import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    console.log("Auth middleware called"); // Debug 1
    console.log("Authorization header:", req.headers.authorization); // Debug 2
    
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1];

    console.log("Token extracted:", token ? "Yes" : "No"); // Debug 3

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debug 4

    // Get user from token
    req.user = await User.findById(decoded.id).select("-password");

    console.log("User found:", req.user ? "Yes" : "No"); // Debug 5

    // Check if user exists
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    console.log("User object:", req.user); // Debug 6

    // Call next middleware
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

export default authMiddleware;