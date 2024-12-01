import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

// Import the same headshot image for all testimonials
import authorHeadshot from '../assets/author.jpg'; // Path to your 'author.jpg' image

// Styled component for the testimonial card
const TestimonialCard = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

// Testimonial text styles
const TestimonialText = styled.p`
  font-size: 16px;
  font-style: italic;
  color: #555;
  margin-bottom: 10px;
`;

// Testimonial author styles
const TestimonialAuthor = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;

// Headshot image styles (make it circular and adjust size)
const AuthorImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%; /* Circular headshot */
  margin-bottom: 15px; /* Space between image and text */
`;

// Container for testimonials
const TestimonialsWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 50px 0;
`;

const TestimonialCarousel = () => {
  const testimonials = [
    {
      text: "This hostel management system is amazing! The booking process is seamless and user-friendly.",
      author: "John Doe",
      headshot: authorHeadshot, // Use the same imported headshot
    },
    {
      text: "I had a great experience booking my hostel here. The platform is very intuitive.",
      author: "Jane Smith",
      headshot: authorHeadshot, // Use the same imported headshot
    },
    {
      text: "Highly recommend this system! It saved me a lot of time when booking a hostel.",
      author: "Alice Johnson",
      headshot: authorHeadshot, // Use the same imported headshot
    },
    {
      text: "Great platform! I could easily find the perfect hostel for my stay.",
      author: "Bob Brown",
      headshot: authorHeadshot, // Use the same imported headshot
    },
  ];

  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop through the carousel
    speed: 500, // Speed of transition
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Auto play the carousel
    autoplaySpeed: 3000, // Delay between slides in milliseconds
  };

  return (
    <TestimonialsWrapper>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index}>
            <AuthorImage src={testimonial.headshot} alt={`${testimonial.author}'s headshot`} />
            <TestimonialText>"{testimonial.text}"</TestimonialText>
            <TestimonialAuthor>- {testimonial.author}</TestimonialAuthor>
          </TestimonialCard>
        ))}
      </Slider>
    </TestimonialsWrapper>
  );
};

export default TestimonialCarousel;
