import React, { useState } from 'react';
import { addHostel } from './hostelAPI'; // Import the addHostel function

const AddHostel = () => {
  const [hostelData, setHostelData] = useState({
    name: '',
    location: '',
    price: '',
    isAvailable: true,
    image: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHostelData({
      ...hostelData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Updated handleSubmit to ensure correct data is sent
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure price is a valid number
    const parsedPrice = parseFloat(hostelData.price);
    if (isNaN(parsedPrice)) {
      alert("Price must be a valid number.");
      return;
    }

    // Ensure isAvailable is a boolean
    const isAvailable = hostelData.isAvailable === true;

    const dataToSend = {
      name: hostelData.name,
      location: hostelData.location,
      price: parsedPrice,
      isAvailable: isAvailable,
      image: hostelData.image || null, // If no image, send null
      description: hostelData.description,
    };

    // Log data to confirm it is correct before sending
    console.log("Data to send:", dataToSend);

    try {
      const newHostel = await addHostel(dataToSend);
      console.log('Hostel added:', newHostel);
      // Optionally, redirect or show a success message here
    } catch (error) {
      console.error('Error adding hostel:', error);
      alert("Failed to add hostel. Please check the data and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={hostelData.name}
        onChange={handleChange}
        required
      />
      <label>Location:</label>
      <input
        type="text"
        name="location"
        value={hostelData.location}
        onChange={handleChange}
        required
      />
      <label>Price:</label>
      <input
        type="number"
        name="price"
        value={hostelData.price}
        onChange={handleChange}
        required
      />
      <label>Availability:</label>
      <input
        type="checkbox"
        name="isAvailable"
        checked={hostelData.isAvailable}
        onChange={() => setHostelData({ ...hostelData, isAvailable: !hostelData.isAvailable })}
      />
      <label>Image URL:</label>
      <input
        type="text"
        name="image"
        value={hostelData.image}
        onChange={handleChange}
      />
      <label>Description:</label>
      <textarea
        name="description"
        value={hostelData.description}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">Add Hostel</button>
    </form>
  );
};

export default AddHostel;
