

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./quiz.css";

// const Quiz = () => {
//   const navigate = useNavigate();

//   const handleQuizStart = (category) => {
//     // const confirmStart = window.confirm("Do you want to start the Quiz?");
//     // if (confirmStart) {
//       navigate(`/quiz/${category}`);
//     // }
//   };

//   return (
//     <div className="quiz-page">
//       {/* Animated Bubbles */}
//       <div className="bubbles">
//         {Array(20)
//           .fill()
//           .map((_, i) => (
//             <div key={i} className="bubble"></div>
//           ))}
//       </div>

//       {/* Blinking Text */}
//       <div className="blinking-text">
//         Utilize Your Cricket Knowledge and Win Big Rewards
//       </div>

//       {/* Main Quiz Container */}
//       <div className="quiz-container">
//         <h1 className="quiz-heading">Select Options</h1>
//         <div className="quiz-cards">
//           <div
//             className="quiz-card"
//             onClick={() => handleQuizStart("MensInternational")}
//           >
//             International
//           </div>
//           <div className="quiz-card" onClick={() => handleQuizStart("WTC")}>
//             WTC
//           </div>
//           <div
//             className="quiz-card"
//             onClick={() => handleQuizStart("WorldCup")}
//           >
//             World Cup
//           </div>
//           <div
//             className="quiz-card"
//             onClick={() => handleQuizStart("WomenInternational")}
//           >
//             Women Cricket
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quiz;
import React from "react";
import { useNavigate } from "react-router-dom";
import "./quiz.css";

const Quiz = () => {
  const navigate = useNavigate();

  const handleQuizStart = (category) => {
    navigate(`/quiz/${category}`);
  };

  return (
    <div className="quiz-page">
      <div className="bubbles">
        {Array(20).fill().map((_, i) => <div key={i} className="bubble"></div>)}
      </div>

      <div className="blinking-text">
        Utilize Your Cricket Knowledge and Win Big Rewards
      </div>

      <div className="quiz-container">
      
        <h1 className="quiz-heading">Select Options</h1>
        <div className="quiz-cards">
          <div className="quiz-card" onClick={() => handleQuizStart("MensInternational")}>International</div>
          <div className="quiz-card" onClick={() => handleQuizStart("WTC")}>WTC</div>
          <div className="quiz-card" onClick={() => handleQuizStart("WorldCup")}>World Cup</div>
          <div className="quiz-card" onClick={() => handleQuizStart("WomenInternational")}>Women Cricket</div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
