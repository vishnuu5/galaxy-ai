import Post from "../models/Post.js";
import { cloudinary } from "../config/cloudinary.js";
import { createError } from "../utils/error.js";

// Get all posts
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email profileImageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// Get post by ID
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email profileImageUrl"
    );

    if (!post) {
      return next(createError(404, "Post not found"));
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// Create new post
export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // Create post object
    const newPost = new Post({
      title,
      content,
      author: req.userId,
    });

    // Upload image if provided
    if (req.file) {
      newPost.imageUrl = req.file.path;
      newPost.imagePublicId = req.file.filename;
    }

    // Save post to database
    const savedPost = await newPost.save();

    // Populate author details
    await savedPost.populate("author", "name email profileImageUrl");

    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// Update post
export const updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const postId = req.params.id;

    // Find post
    const post = await Post.findById(postId);

    if (!post) {
      return next(createError(404, "Post not found"));
    }

    // Check if user is the author
    if (post.author.toString() !== req.userId) {
      return next(createError(403, "You can only update your own posts"));
    }

    // Update post fields
    post.title = title;
    post.content = content;

    // Handle image update
    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (post.imagePublicId) {
        await cloudinary.uploader.destroy(post.imagePublicId);
      }

      // Update with new image
      post.imageUrl = req.file.path;
      post.imagePublicId = req.file.filename;
    }

    // Save updated post
    const updatedPost = await post.save();

    // Populate author details
    await updatedPost.populate("author", "name email profileImageUrl");

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// Delete post
export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    // Find post
    const post = await Post.findById(postId);

    if (!post) {
      return next(createError(404, "Post not found"));
    }

    // Check if user is the author
    if (post.author.toString() !== req.userId) {
      return next(createError(403, "You can only delete your own posts"));
    }

    // Delete image from Cloudinary if exists
    if (post.imagePublicId) {
      await cloudinary.uploader.destroy(post.imagePublicId);
    }

    // Delete post from database
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
