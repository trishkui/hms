import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';
import Select from '../components/Select';
import { registerUser } from '../api/auth';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    role: 'TENANT', // Default role
  });
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: async (response) => {
      alert('Registration Successful! Logging in...');
      try {
        // After successful registration, log the user in
        const loginResponse = await axios.post('http://localhost:4000/user/login', {
          email: formData.email,
          password: formData.password,
        });

        // Save token and role to localStorage
        localStorage.setItem('token', loginResponse.data.token);
        localStorage.setItem('role', loginResponse.data.role);

        // Redirect based on the user's role
        if (loginResponse.data.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else if (loginResponse.data.role === 'TENANT') {
          navigate('/tenant/hostels');
        } else {
          throw new Error('Unknown role received from server');
        }
      } catch (error) {
        console.error('Error during login:', error);
        setError(error.response?.data?.message || 'Login failed');
      }
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Something went wrong!');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      // Sending the registration request
      await mutation.mutate(formData); // Registration triggers login in onSuccess
    } catch (err) {
      console.error('Error during registration or login:', err);
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <SignupContainer>
      <Form onSubmit={handleSubmit}>
        <FormTitle>Sign Up</FormTitle>
        <Input
          name="firstname"
          placeholder="First Name"
          onChange={handleChange}
        />
        <Input
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <Input
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="TENANT">Tenant</option>
          <option value="ADMIN">Admin</option>
        </Select>
        <Button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Signing Up...' : 'Sign Up'}
        </Button>
        {error && <Error>{error}</Error>}
      </Form>
    </SignupContainer>
  );
};

export default SignupPage;

// Styled Components
const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

const Form = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Error = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;
