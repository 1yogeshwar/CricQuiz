// src/components/Hero.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
// import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const HeroSection = styled.section`
  width: 100vw; /* Full width of the viewport */
  height: 100vh; /* Full height of the viewport */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg,#161718, #18052d); /* Modern gradient */
  color: #fff;
  text-align: center;
  overflow: hidden; /* Hide overflow */
  position: relative; /* For positioning stars */
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 20px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  z-index: 1; /* Ensure text is on top of background */
  font-weight: 700;
  color:#dbf753;
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 1.5rem;
  margin-bottom: 40px;
  z-index: 1; /* Ensure text is on top of background */
  font-weight: 400;
  color: #d0d0d0;
`;

const HeroButton = styled(motion.a)`
  padding: 14px 40px;
  background-color:#dbf753;

  color: #000000;
  border-radius: 25px;
  text-decoration: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 3s, background-color 2s, box-shadow 4s;
  z-index: 1; 

  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    transform: scale(1.05); /* Slightly enlarges the button */
  }

  &:active {
    background-color: #000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) inset;
    transform: scale(0.98); /* Slightly shrinks the button */
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
  z-index: 0;

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

const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
  z-index: 1; /* Ensure pulse effect is behind the button */
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  z-index: 1; /* Ensure icons are on top of background */

  a {
    color: #fff;
    font-size: 2rem;
    transition: color 0.3s;

    &:hover {
      color: #e0e0e0;
    }
  }
`;

// Adjusted Stars for modern UI
const Stars = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;

  @keyframes twinkling {
    0% { opacity: 0; transform: scale(0.5); }
    50% { opacity: 1; transform: scale(1.0); }
    100% { opacity: 0; transform: scale(0.5); }
  }

  div {
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
    width: 2px;
    height: 2px;
    border-radius: 50%;
    animation: twinkling 3s infinite;
  }

  div:nth-child(odd) {
    animation-duration: 4s;
  }

  div:nth-child(even) {
    animation-duration: 5s;
  }
`;

const generateStars = () => {
  const stars = [];
  for (let i = 0; i < 100; i++) {
    const style = {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`
    };
    stars.push(<div key={i} style={style} />);
  }
  return stars;
};

const Hero = () => {
  const [stars, setStars] = useState(generateStars());
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const newStars = stars.map((star, index) => {
      const style = {
        ...star.props.style,
        transform: `translate(${mouseX * 0.01}px, ${mouseY * 0.01}px)`
      };
      return React.cloneElement(star, { style });
    });
    setStars(newStars);
  }, [mouseX, mouseY]);

  return (
    <HeroSection>
      <Stars>{stars}</Stars>
      <HeroTitle
        initial={{ y: -250 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        Welcome to CriQuiz
      </HeroTitle>
      <HeroSubtitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Unlease your Cricket Knowledge with CriQuiz.
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
      {/* <IconWrapper>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </IconWrapper> */}
    </HeroSection>
  );
};

export default Hero;
