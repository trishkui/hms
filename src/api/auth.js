import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/user'; // Define base URL once

// Register a user
export const registerUser = async (userData) => {
  try {
    console.log('Sending user data for registration:', userData);

    const response = await axios.post(`${API_BASE_URL}/register`, userData);

    // Check if the registration was successful
    if (response.status === 201) {
      console.log('Registration successful:', response.data);
      return response.data;  // Return response data (e.g., user details, message)
    }

    // If response status is not 201, handle unexpected cases
    console.error('Unexpected response during registration:', response.data);
    throw new Error('Registration failed');
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;  // Rethrow for higher-level handling if needed
  }
};

// Login a user
export const loginUser = async (userData) => {
  try {
    console.log('Sending user data for login:', userData);

    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    console.log('Login successful:', response.data);

    // Ensure response.data.data is correctly accessed
    const { token, role } = response.data.data;  // Access 'data' object first

    if (!token || !role) {
      throw new Error('Token or role is missing in the response.');
    }

    // Store token and role in localStorage
    localStorage.setItem('userToken', token);
    localStorage.setItem('userRole', role.toLowerCase());  // Store role as lowercase (e.g., 'admin', 'tenant')

    // Optionally, redirect based on role
    if (role === 'ADMIN') {
      window.location.href = '/admin/dashboard';  // Redirect to admin dashboard
    } else {
      window.location.href = '/tenant/hostels';  // Redirect to tenant view
    }

    return response.data;  // Return response for further use (like user feedback)
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;  // Rethrow error for higher-level handling if needed
  }
};
