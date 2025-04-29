import express from "express";
import {
  register,
  login,
  getCurrentUser,
  logout,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Get current user route
router.get("/me", verifyToken, getCurrentUser);

// Logout route
router.post("/logout", logout);

export default router;
