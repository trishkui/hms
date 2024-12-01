import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #4CAF50;
  color: white;
`;

const Navbar = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavButton = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #333;
  &:hover {
    background-color: #555;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h2>Hostel Management</h2>
      <Navbar>
        <NavButton to="/signup">Sign Up</NavButton>
        <NavButton to="/login">Login</NavButton>
      </Navbar>
    </HeaderContainer>
  );
};

export default Header;
