// components/QuizCard.js
import React from 'react';
import { motion } from 'framer-motion';
import './drawer.css';

const QuizCard = ({ question, options, onOptionClick }) => {
  return (
    <motion.div 
      className="quiz-card"
      whileHover={{ translateY: -10, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="quiz-question">{question}</h2>
      <div className="quiz-options">
        {options.map((option, index) => (
          <div 
            key={index} 
            className="quiz-option" 
            onClick={() => onOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuizCard;
