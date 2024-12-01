import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 20px;
  background-color: #333;
  color: white;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 Hostel Management System. All Rights Reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
