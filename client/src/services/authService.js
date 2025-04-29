import axios from "axios";
import { API_URL } from "../utils/constants";

// Set up axios with credentials
axios.defaults.withCredentials = true;

// Helper function to set auth token in localStorage and axios headers
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("authToken", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("authToken");
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Check for token on app load
const token = localStorage.getItem("authToken");
if (token) {
  setAuthToken(token);
}

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
    });

    // Set token in localStorage and axios headers
    if (response.data.token) {
      setAuthToken(response.data.token);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    // Set token in localStorage and axios headers
    if (response.data.token) {
      setAuthToken(response.data.token);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`);
    // Clear token from localStorage and axios headers
    setAuthToken(null);
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/me`);
    return response.data;
  } catch (error) {
    // Don't throw an error for 401 responses (not authenticated)
    if (error.response?.status === 401) {
      setAuthToken(null); // Clear invalid token
      return null;
    }
    throw new Error(error.response?.data?.message || "Failed to get user");
  }
};
