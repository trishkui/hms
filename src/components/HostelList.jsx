import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchAllHostelsUser } from '../api/hostelAPI';

const HostelList = () => {
  const [hostels, setHostels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const data = await fetchAllHostelsUser();
        setHostels(data);
      } catch (err) {
        console.error('Error fetching hostels:', err);
        setError('Failed to fetch hostels. Please try again later.');
      }
    };

    fetchHostels();
  }, []);

  return (
    <Container>
      <Title>Available Hostels</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <HostelGrid>
        {hostels.map((hostel) => (
          <HostelCard key={hostel.id}>
            <Image src={hostel.image || 'https://via.placeholder.com/150'} alt={hostel.name} />
            <CardContent>
              <HostelName>{hostel.name}</HostelName>
              <HostelDetails>{hostel.location}</HostelDetails>
              <HostelPrice>${hostel.price}/month</HostelPrice>
            </CardContent>
          </HostelCard>
        ))}
      </HostelGrid>
    </Container>
  );
};

export default HostelList;

// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
`;

const HostelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 0 20px;
`;

const HostelCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 15px;
`;

const HostelName = styled.h3`
  font-size: 18px;
  color: #007bff;
  margin-bottom: 10px;
`;

const HostelDetails = styled.p`
  font-size: 14px;
  color: #555;
`;

const HostelPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #28a745;
  margin-top: 10px;
`;
