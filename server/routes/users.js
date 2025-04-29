import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Get user profile
router.get("/profile/:id", verifyToken, getUserProfile);

// Update user profile
router.put(
  "/profile",
  verifyToken,
  upload.single("profileImage"),
  updateUserProfile
);

// Change password
router.put("/change-password", verifyToken, changePassword);

export default router;
