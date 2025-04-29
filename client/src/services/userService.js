import axios from "axios";
import { API_URL } from "../utils/constants";

export const updateUserProfile = async (userData) => {
  try {
    const formData = new FormData();

    // Add text fields
    if (userData.name) formData.append("name", userData.name);
    if (userData.bio !== undefined) formData.append("bio", userData.bio);

    // Add profile image if exists
    if (userData.profileImage) {
      formData.append("profileImage", userData.profileImage);
    }

    const response = await axios.put(`${API_URL}/users/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile"
    );
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/users/profile${userId ? `/${userId}` : ""}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};
