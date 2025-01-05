// import React, { useState, useEffect } from "react";
// import "./quizpage.css";

// const QuizPage = () => {
//   const [quizStarted, setQuizStarted] = useState(false); // To track quiz state
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Current question
//   const [timer, setTimer] = useState(0); // Timer value
//   const [score, setScore] = useState(0); // Score
//   const [quizData, setQuizData] = useState(null); // Questions data
//   const [quizCompleted, setQuizCompleted] = useState(false); // Quiz completion state

//   // Timer logic
//   useEffect(() => {
//     let interval = null;
//     if (quizStarted && !quizCompleted) {
//       interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
//     }
//     return () => clearInterval(interval);
//   }, [quizStarted, quizCompleted]);

//   // Fetch quiz data
//   useEffect(() => {
//     const fetchQuizData = async () => {
//       const category = window.location.pathname.split("/").pop(); // Get category from URL
//       const response = await fetch(`http://localhost:3001/api/quizzes/${category}`);
//       const data = await response.json();
//       setQuizData(data.questions);
//     };
//     fetchQuizData();
//   }, []);

//   const handleStartQuiz = () => {
//     setQuizStarted(true);
//   };

//   const handleAnswer = (selectedOption) => {
//     if (selectedOption === quizData[currentQuestionIndex].correct) {
//       setScore(score + 1);
//     }
//     handleNextQuestion();
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex + 1 < quizData.length) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       setQuizCompleted(true); // Mark quiz as complete
//       setQuizStarted(false);
//     }
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   return (
//     <div className="quiz-page">
//       {/* Display Start Button */}
//       {!quizStarted && !quizCompleted && (
//         <div className="start-quiz-container">
//           <h1>Do you want to start the quiz?</h1>
//           <button onClick={handleStartQuiz} className="start-quiz-button">
//             Start Quiz
//           </button>
//         </div>
//       )}

//       {/* Display Quiz Questions */}
//       {quizStarted && quizData && currentQuestionIndex < quizData.length && (
//         <div className="quiz-container">
//           <h2>Question {currentQuestionIndex + 1}</h2>
//           <p>{quizData[currentQuestionIndex].question}</p>
//           <div className="options-container">
//             {quizData[currentQuestionIndex].options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleAnswer(option)}
//                 className="option-button"
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//           <button onClick={handleNextQuestion} className="skip-button">
//             Skip
//           </button>
//           <p className="timer">Time Elapsed: {formatTime(timer)}</p>
//         </div>
//       )}

//       {/* Display Final Result */}
//       {quizCompleted && (
//         <div className="result-container">
//           <h1>Quiz Complete!</h1>
//           <p>
//             Your score is {score}/{quizData?.length} in {formatTime(timer)}.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizPage;
// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const QuizPage = () => {
//   const [socket, setSocket] = useState(null);
//   const [lobby, setLobby] = useState(null);
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [timer, setTimer] = useState(0);
//   const [score, setScore] = useState(0);
//   const [quizData, setQuizData] = useState(null);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [result, setResult] = useState(null); // Add state for the result message

//   useEffect(() => {
//     const newSocket = io("http://localhost:3001");
//     setSocket(newSocket);

//     // Listen for server events
//     newSocket.on("startQuiz", (data) => {
//       setLobby(data.lobby);
//       setQuizStarted(true);
//     });

//     newSocket.on("quizResult", (data) => {
//       setResult(data.result); // Update the result message
//       setQuizCompleted(true);
//       setQuizStarted(false);
//     });

//     return () => newSocket.close();
//   }, []);

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       const category = window.location.pathname.split("/").pop(); // Get category from URL
//       const response = await fetch(`http://localhost:3001/api/quizzes/${category}`);
//       const data = await response.json();
//       setQuizData(data.questions);
//     };
//     fetchQuizData();
//   }, []);

//   const handleAnswer = (selectedOption) => {
//     const correct = selectedOption === quizData[currentQuestionIndex].correct;
//     setScore((prev) => (correct ? prev + 1 : prev));
//     setCurrentQuestionIndex((prev) => prev + 1);

//     socket.emit("answer", { lobby, player: socket.id, correct, time: timer });

//     if (currentQuestionIndex + 1 === quizData.length) {
//       socket.emit("endQuiz", lobby); // Notify server to end the quiz
//     }
//   };

//   const formatTime = (time) => `${Math.floor(time / 60)}:${time % 60}`;

//   useEffect(() => {
//     let interval = null;
//     if (quizStarted && !quizCompleted) {
//       interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
//     }
//     return () => clearInterval(interval);
//   }, [quizStarted, quizCompleted]);

//   return (
//     <div className="quiz-page">
//       {!quizStarted && !quizCompleted && <h1>Waiting for another player...</h1>}
//       {quizStarted && quizData && currentQuestionIndex < quizData.length && (
//         <div className="quiz-container">
//           <h2>Question {currentQuestionIndex + 1}</h2>
//           <p>{quizData[currentQuestionIndex].question}</p>
//           <div className="options-container">
//             {quizData[currentQuestionIndex].options.map((option, index) => (
//               <button key={index} onClick={() => handleAnswer(option)} className="option-button">
//                 {option}
//               </button>
//             ))}
//           </div>
//           <p className="timer">Time Elapsed: {formatTime(timer)}</p>
//         </div>
//       )}
//       {quizCompleted && result && (
//         <div className="result-container">
//           <h1>Quiz Complete!</h1>
//           <p>{result}</p> {/* Display the winner message */}
//           <p>Your score is {score}/{quizData?.length}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizPage;
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./quizpage.css";

const QuizPage = () => {
  const [socket, setSocket] = useState(null);
  const [lobby, setLobby] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [result, setResult] = useState(null); // To store winner/loser message
  const [waitingForOtherPlayer, setWaitingForOtherPlayer] = useState(false); // Waiting flag

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    newSocket.on("startQuiz", (data) => {
      setLobby(data.lobby);
      setQuizStarted(true);
    });

    newSocket.on("waitingForOtherPlayer", () => {
      setWaitingForOtherPlayer(true); // Set waiting flag
    });

    newSocket.on("quizResult", (data) => {
      setResult(data.result);
      setQuizCompleted(true);
      setQuizStarted(false);
      setWaitingForOtherPlayer(false); // Clear waiting flag
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    const fetchQuizData = async () => {
      const category = window.location.pathname.split("/").pop(); // Get category from URL
      const response = await fetch(`http://localhost:3001/api/quizzes/${category}`);
      const data = await response.json();
      setQuizData(data.questions);
    };
    fetchQuizData();
  }, []);

  const handleAnswer = (selectedOption) => {
    const correct = selectedOption === quizData[currentQuestionIndex].correct;
    setScore((prev) => (correct ? prev + 1 : prev));
    setCurrentQuestionIndex((prev) => prev + 1);

    socket.emit("answer", { lobby, player: socket.id, correct, time: timer });

    if (currentQuestionIndex + 1 === quizData.length) {
      socket.emit("finishQuiz", { lobby, player: socket.id, score }); // Notify server of quiz completion
      setQuizCompleted(true);
    }
  };

  const formatTime = (time) => `${Math.floor(time / 60)}:${time % 60}`;

  useEffect(() => {
    let interval = null;
    if (quizStarted && !quizCompleted) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, quizCompleted]);

  return (
    <div className="quiz-page">
      {!quizStarted && !quizCompleted && <h1>Waiting for another player...</h1>}
      {waitingForOtherPlayer && <h1>Waiting for the other player to finish...</h1>}
      {quizStarted && quizData && currentQuestionIndex < quizData.length && (
        <div className="quiz-container">
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p>{quizData[currentQuestionIndex].question}</p>
          <div className="options-container">
            {quizData[currentQuestionIndex].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)} className="option-button">
                {option}
              </button>
            ))}
          </div>
          <p className="timer">Time Elapsed: {formatTime(timer)}</p>
        </div>
      )}
      {quizCompleted && result && (
        <div className="result-container">
          <h1>Quiz Complete!</h1>
          <p>{result}</p> {/* Display the winner message */}
          <p>Your score is {score}/{quizData?.length}</p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
