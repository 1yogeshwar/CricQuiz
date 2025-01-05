import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const HeroSection = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:linear-gradient(85deg, #080808, #071029); /* Dark gradient */
  color: #fff;
  text-align: center;
  position: relative; /* For absolute positioning of sunspots */
  overflow: hidden; /* Ensure sunspots stay within bounds */
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 20px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #fff;
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 1.5rem;
  margin-bottom: 40px;
  color: #c9d1d9; /* GitHub-inspired subtitle color */
`;

const HeroButton = styled(motion.a)`
  padding: 12px 30px;
  background-color: #0366d6; /* GitHub's primary button color */
  color: #fff;
  border-radius: 30px;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #2188ff; /* Lighter shade of primary color on hover */
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
  }

  &:active {
    background-color: #005cc5; /* Darker shade on active */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) inset;
    transform: scale(0.98);
  }
`;

const Sunspot = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 0, 0.8), rgba(255, 255, 0, 0) 70%);
  width: ${Math.random() * 100 + 50}px; /* Random width between 50px and 150px */
  height: ${Math.random() * 100 + 50}px; /* Random height between 50px and 150px */
  top: ${Math.random() * 100}%; /* Random top position */
  left: ${Math.random() * 100}%; /* Random left position */
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0.6;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  animation: pulse 5s infinite;
`;

const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${PulseEffect} {
    animation: pulse 1.5s infinite;
  }
`;

const PulseEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  animation: pulse 2s infinite;
  pointer-events: none;

  @keyframes pulse {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0;
    }
    100% {
      transform: scale(0);
      opacity: 1;
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;

  a {
    color: #fff;
    font-size: 2rem;
    transition: color 0.3s;

    &:hover {
      color: #e0e0e0;
    }
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroTitle
        initial={{ y: -250 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        Welcome to Modern Landing Page
      </HeroTitle>
      <HeroSubtitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Beautiful animations and smooth gradients
      </HeroSubtitle>
      <ButtonWrapper>
        <HeroButton
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, delay: 1 }}
          href="/register"
        >
          Get Started
        </HeroButton>
        <PulseEffect />
      </ButtonWrapper>
      {/* Add multiple Sunspot elements */}
      {Array.from({ length: 4 }).map((_, i) => (
        <Sunspot key={i} />
      ))}
    </HeroSection>
  );
};

export default Hero;
