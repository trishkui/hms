import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TenantNavbar from './TenantNavbar';
import { fetchAllHostelsUser } from '../api/hostelAPI';


const TenantDashboard = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHostels = async () => {
      try {
        setLoading(true);
        const data = await fetchAllHostelsUser();
        setHostels(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHostels();
  }, []);

  if (loading) return <p>Loading hostels...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <TenantNavbar />
      <Title>Available Hostels</Title>
      <HostelList>
        {hostels.map((hostel) => (
          <HostelCard key={hostel.id}>
            <h3>{hostel.name}</h3>
            <p>Location: {hostel.location}</p>
            <p>Price: ${hostel.price}</p>
            <p>{hostel.isAvailable ? 'Available' : 'Not Available'}</p>
          </HostelCard>
        ))}
      </HostelList>
    </div>
  );
};

export default TenantDashboard;

// Styled Components
const Title = styled.h1`
  text-align: center;
  margin: 20px 0;
`;

const HostelList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const HostelCard = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;
