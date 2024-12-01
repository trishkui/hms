import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TestimonialCarousel from '../components/TestimonialCarousel';
import heroImage from '../assets/hero.jpg';

// Hero Section Styles
const HeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  margin-top: 20px; /* Adds space between the header and the hero section */
  background-image: url(${heroImage}); 
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3); /* Box shadow added */
  border-radius: 8px; /* Optional: Adds rounded corners */
`;

const HeroText = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Text shadow for better visibility */
`;

// Testimonial Section Wrapper
const TestimonialSection = styled.section`
  padding: 50px 0;
  background-color: #f8f9fa; /* Soft light gray */
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1); /* Inner shadow effect */
`;

const TestimonialHeading = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  color: #333; /* Darker text color */
  font-weight: bold;
`;

// Footer Section Styles (optional, for consistency)
const FooterWrapper = styled.div`
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
`;

// HomePage Component
const HomePage = () => {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection>
        <HeroText>Welcome to the Hostel Management System</HeroText>
      </HeroSection>

      {/* Testimonial Section */}
      <TestimonialSection>
        <TestimonialHeading>What Our Users Say</TestimonialHeading>
        <TestimonialCarousel />
      </TestimonialSection>

      {/* Footer */}
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </div>
  );
};

export default HomePage;
