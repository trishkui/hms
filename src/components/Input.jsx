import React from 'react';

const Input = ({ name, type = 'text', value, placeholder, onChange }) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
    />
  );
};

export default Input;
