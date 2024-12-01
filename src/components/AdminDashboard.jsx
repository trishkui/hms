import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAllHostelsAdmin, deleteHostel, updateHostel, addHostel } from "../api/hostelAPI";

const AdminDashboard = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingHostel, setEditingHostel] = useState(null);
  const [addingHostel, setAddingHostel] = useState(false);

  useEffect(() => {
    const loadHostels = async () => {
      try {
        setLoading(true);
        const data = await fetchAllHostelsAdmin();
        setHostels(data);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadHostels();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteHostel(id);
      setHostels((prevHostels) => prevHostels.filter((hostel) => hostel.id !== id));
    } catch (error) {
      console.error("Error deleting hostel:", error);
      alert("Failed to delete the hostel. Please try again.");
    }
  };

  const handleEdit = (hostel) => {
    setEditingHostel(hostel);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const formattedData = {
        ...updatedData,
        price: parseFloat(updatedData.price),
        isAvailable: updatedData.isAvailable === "on",
      };

      const updatedHostel = await updateHostel(editingHostel.id, formattedData);

      setHostels((prevHostels) =>
        prevHostels.map((hostel) =>
          hostel.id === updatedHostel.id ? updatedHostel : hostel
        )
      );
      setEditingHostel(null); // Close the edit form
    } catch (error) {
      console.error("Error updating hostel:", error);
      alert("Failed to update the hostel. Please try again.");
    }
  };

  const handleAdd = async (newData) => {
    try {
      const formattedData = {
        name: newData.name,
        location: newData.location,
        price: parseFloat(newData.price),
        description: newData.description,
        isAvailable: newData.isAvailable,
      };

      const addedHostel = await addHostel(formattedData);

      setHostels((prevHostels) => [...prevHostels, addedHostel]);
      setAddingHostel(false); // Close the add form
    } catch (error) {
      console.error("Error adding hostel:", error);
      alert("Failed to add the hostel. Please check the data and try again.");
    }
  };

  if (loading) return <Loading>Loading...</Loading>;
  if (error) return <Error> Error: {error.message}</Error>;

  return (
    <Container>
      <Title>Admin Dashboard</Title>
      <AddHostelButton onClick={() => setAddingHostel(true)}>Add New Hostel</AddHostelButton>

      {addingHostel && (
        <FormContainer>
          <h2>Add New Hostel</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newData = {
                name: e.target.name.value,
                location: e.target.location.value,
                price: e.target.price.value,
                description: e.target.description.value,
                isAvailable: e.target.isAvailable.checked,
              };
              handleAdd(newData);
            }}
          >
            <InputField name="name" label="Name" required />
            <InputField name="location" label="Location" required />
            <InputField type="number" name="price" label="Price" required />
            <TextAreaField name="description" label="Description" required />
            <CheckboxField name="isAvailable" label="Available" />
            <Button type="submit">Add Hostel</Button>
            <CancelButton type="button" onClick={() => setAddingHostel(false)}>Cancel</CancelButton>
          </form>
        </FormContainer>
      )}

      <HostelTable>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Available</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {hostels.map((hostel) => (
            <tr key={hostel.id}>
              <TableData>{hostel.name}</TableData>
              <TableData>{hostel.location}</TableData>
              <TableData>{hostel.price}</TableData>
              <TableData>{hostel.isAvailable ? "Yes" : "No"}</TableData>
              <TableData>
                <Button onClick={() => handleEdit(hostel)}>Edit</Button>
                <Button onClick={() => handleDelete(hostel.id)}>Delete</Button>
              </TableData>
            </tr>
          ))}
        </tbody>
      </HostelTable>

      {editingHostel && (
        <FormContainer>
          <h2>Edit Hostel</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const updatedData = {
                name: e.target.name.value,
                location: e.target.location.value,
                price: e.target.price.value,
                description: e.target.description.value,
                isAvailable: e.target.isAvailable.checked,
              };
              handleUpdate(updatedData);
            }}
          >
            <InputField name="name" label="Name" defaultValue={editingHostel.name} required />
            <InputField name="location" label="Location" defaultValue={editingHostel.location} required />
            <InputField type="number" name="price" label="Price" defaultValue={editingHostel.price} required />
            <TextAreaField name="description" label="Description" defaultValue={editingHostel.description} required />
            <CheckboxField name="isAvailable" label="Available" defaultChecked={editingHostel.isAvailable} />
            <Button type="submit">Save</Button>
            <CancelButton type="button" onClick={() => setEditingHostel(null)}>Cancel</CancelButton>
          </form>
        </FormContainer>
      )}
    </Container>
  );
};

export default AdminDashboard;

// Styled Components

const Container = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const AddHostelButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const InputField = ({ label, ...props }) => (
  <div>
    <label>{label}</label>
    <input {...props} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
  </div>
);

const TextAreaField = ({ label, ...props }) => (
  <div>
    <label>{label}</label>
    <textarea {...props} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
  </div>
);

const CheckboxField = ({ label, ...props }) => (
  <div>
    <label>
      <input type="checkbox" {...props} />
      {label}
    </label>
  </div>
);

const Button = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  
  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const HostelTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 10px;
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 20px;
  margin-top: 50px;
`;

const Error = styled.div`
  text-align: center;
  color: red;
  margin-top: 50px;
`;
