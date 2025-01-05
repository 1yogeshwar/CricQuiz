import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './drawer.css'; 

const QuizDrawer = ({ onQuizSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleQuizSelect = (category) => {
    onQuizSelect(category);
    setIsOpen(false);
  };

  return (
    <Menu
      isOpen={isOpen}
      onToggle={handleToggle}
      className={`bm-menu ${isOpen ? 'is-open' : ''}`}
    >
      <h2>Choose Category</h2>
      <div className="drawer-field" onClick={() => handleQuizSelect('MensInternational')}>
        <label>Mens International</label>
      </div>
      <div className="drawer-field" onClick={() => handleQuizSelect('IndianPremierLeague')}>
        <label>Indian Premier League</label>
      </div>
      <div className="drawer-field" onClick={() => handleQuizSelect('WorldCup')}>
        <label>World Cup</label>
      </div>
      <div className="drawer-field" onClick={() => handleQuizSelect('WomenInternational')}>
        <label>Women International</label>
      </div>
      
    </Menu>
  );
};

export default QuizDrawer;
