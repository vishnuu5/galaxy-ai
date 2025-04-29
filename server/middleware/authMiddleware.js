import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token =
      req.cookies.token ||
      (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return next(createError(401, "Not authenticated"));
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(createError(401, "Invalid token"));
      }

      // Add user ID to request
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    next(createError(401, "Not authenticated"));
  }
};
