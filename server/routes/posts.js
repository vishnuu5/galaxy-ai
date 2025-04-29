import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Get all posts
router.get("/", getAllPosts);

// Get post by ID
router.get("/:id", getPostById);

// Create new post (protected route)
router.post("/", verifyToken, upload.single("image"), createPost);

// Update post (protected route)
router.put("/:id", verifyToken, upload.single("image"), updatePost);

// Delete post (protected route)
router.delete("/:id", verifyToken, deletePost);

export default router;
