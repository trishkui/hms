import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

// Admin: Get all hostels
export const fetchAllHostelsAdmin = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/hostels`);
    console.log("Fetched hostels:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching hostels:", error);
    throw new Error("Failed to fetch hostels");
  }
};

// Admin: Add a hostel
export const addHostel = async (newHostelData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/hostels`, newHostelData);
    return response.data;
  } catch (error) {
    console.error("Error adding hostel:", error);
    throw new Error("Failed to add hostel");
  }
};

// Admin: Update a hostel
export const updateHostel = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/hostels/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating hostel:", error);
    throw error;
  }
};

// Admin: Delete a hostel
export const deleteHostel = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/admin/hostels/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting hostel:", error);
    throw error;
  }
};

// User: Get all hostels

export const fetchAllHostelsUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/hostels`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hostels:', error);
    throw new Error('Failed to fetch hostels');
  }
};


// Fetch hostel details by ID
export const fetchHostelById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/hostels/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hostel details:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch hostel details");
  }
};
