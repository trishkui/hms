// Select.jsx (Styled Component)
import React from 'react';
import styled from 'styled-components';

// Styled Select container
const StyledSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  font-size: 14px;
  color: #333;
  outline: none;
  
  &:focus {
    border-color: #007bff;
  }

  option {
    padding: 10px;
  }
`;

const Select = ({ name, value, onChange, children }) => {
  return (
    <StyledSelect name={name} value={value} onChange={onChange}>
      {children}
    </StyledSelect>
  );
};

export default Select;
