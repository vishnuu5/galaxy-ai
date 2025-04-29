import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { cloudinary } from "../config/cloudinary.js";
import { createError } from "../utils/error.js";

// Get user profile
export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.params.id || req.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update user profile
export const updateUserProfile = async (req, res, next) => {
  try {
    const { name, bio } = req.body;

    // Find user
    const user = await User.findById(req.userId);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Update user fields
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;

    // Handle profile image update
    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (user.profileImagePublicId) {
        await cloudinary.uploader.destroy(user.profileImagePublicId);
      }

      // Update with new image
      user.profileImageUrl = req.file.path;
      user.profileImagePublicId = req.file.filename;
    }

    // Save updated user
    const updatedUser = await user.save();

    // Return user data (without password)
    const { password, ...userData } = updatedUser._doc;

    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

// Change password
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Find user
    const user = await User.findById(req.userId);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Check if current password is correct
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return next(createError(401, "Current password is incorrect"));
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};
