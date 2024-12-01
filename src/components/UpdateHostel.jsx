import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { fetchHostelById, updateHostel } from "../api/hostelAPI";
import styled from "styled-components";

// Styled Components
const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const UpdateHostel = () => {
  const { id } = useParams(); // Get hostel ID from URL
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    isAvailable: false,
  });

  // Fetch current hostel data
  const { data: hostel, isLoading, isError, error } = useQuery({
    queryKey: ["hostel", id],
    queryFn: () => fetchHostelById(id),
    enabled: !!id, // Only fetch if ID is available
  });

  useEffect(() => {
    if (hostel) {
      setFormData({
        name: hostel.name,
        location: hostel.location,
        price: hostel.price,
        isAvailable: hostel.isAvailable,
      });
    }
  }, [hostel]);

  // Mutation for updating the hostel
  const mutation = useMutation({
    mutationFn: (updatedHostel) => updateHostel(id, updatedHostel),
    onSuccess: () => {
      queryClient.invalidateQueries(["hostels"]); // Refresh hostels list
      alert("Hostel updated successfully!");
      navigate("/admin");
    },
    onError: (err) => {
      alert(`Failed to update hostel: ${err.message}`);
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <FormContainer>
      <h2>Update Hostel</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <div>
          <label>
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
            Available
          </label>
        </div>
        <Button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Updating..." : "Update Hostel"}
        </Button>
      </form>
    </FormContainer>
  );
};

export default UpdateHostel;
