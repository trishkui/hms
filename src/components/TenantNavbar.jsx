import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TenantNavbar = () => {
  return (
    <Nav>
      <NavLink to="/tenant">Dashboard</NavLink>
      <Link to="/tenant/hostels">Hostels</Link>
      <NavLink to="/logout">Logout</NavLink>
    </Nav>
  );
};

export default TenantNavbar;

// Styled Components
const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #007bff;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
