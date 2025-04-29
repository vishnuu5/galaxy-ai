import axios from "axios";
import { API_URL } from "../utils/constants";

export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch posts");
  }
};

export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch post");
  }
};

export const createPost = async (postData) => {
  try {
    const formData = new FormData();

    // Add text fields
    formData.append("title", postData.title);
    formData.append("content", postData.content);

    // Add image if exists
    if (postData.image) {
      formData.append("image", postData.image);
    }

    const response = await axios.post(`${API_URL}/posts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create post");
  }
};

export const updatePost = async (id, postData) => {
  try {
    const formData = new FormData();

    // Add text fields
    formData.append("title", postData.title);
    formData.append("content", postData.content);

    // Add image if exists
    if (postData.image) {
      formData.append("image", postData.image);
    }

    const response = await axios.put(`${API_URL}/posts/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update post");
  }
};

export const deletePost = async (id) => {
  try {
    await axios.delete(`${API_URL}/posts/${id}`);
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete post");
  }
};
