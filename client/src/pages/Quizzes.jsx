// pages/QuizPage.js
import React, { useState, useEffect } from 'react';
import QuizDrawer from '../componants/QuizDrawer'; 
import QuizCard from '../componants/QuizCard'; 

import './quizzes.css'; 
import axios from 'axios';


const QuizPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalTime, setTotalTime] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (selectedQuiz) {
      console.log(`Fetching questions for category: ${selectedQuiz}`);
      axios.get(`/api/quizzes/${selectedQuiz}`)
        .then(response => {
          if (response.data && response.data.questions) {
            console.log('Quiz data loaded:', response.data);
            setQuestions(response.data.questions);
            setQuestionIndex(0);
            setStartTime(new Date());
            setEndTime(null);
            setTotalTime(null);
            setCorrectAnswers(0);
            setTimer(0);
          } else {
            console.error("Invalid response format", response);
            setQuestions([]);
          }
        })
        .catch(error => {
          console.error("Error loading quiz data:", error);
          setQuestions([]);
        });
    }
  }, [selectedQuiz]);

  useEffect(() => {
    let timerInterval;
    if (startTime && !endTime) {
      timerInterval = setInterval(() => {
        setTimer((new Date() - startTime) / 1000);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [startTime, endTime]);

  const handleQuizSelection = (quizType) => {
    setSelectedQuiz(quizType);
  };

  const handleOptionClick = (option) => {
    if (questions[questionIndex].correct === option) {
      setCorrectAnswers(correctAnswers + 1);
    }
    if (questionIndex + 1 === questions.length) {
      setEndTime(new Date());
    } else {
      setQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  useEffect(() => {
    if (startTime && endTime) {
      const duration = (endTime - startTime) / 1000;
      setTotalTime(duration);
    }
  }, [endTime]);

  return (
    <div className="quiz-page">
      <QuizDrawer onQuizSelect={handleQuizSelection} />
      <div className="quiz-content">
        <h3>Get</h3>
        {questions.length > 0 ? (
          <>
            <div className="quiz-timer">
              Timer: {timer.toFixed(0)} seconds
            </div>
            {endTime ? (
              <div className="quiz-result">
                <p>Quiz Completed!</p>
                <p>Total Time Taken: {totalTime} seconds</p>
                <p>Correct Answers: {correctAnswers} out of {questions.length}</p>
              </div>
            ) : (
              <QuizCard
                question={questions[questionIndex].question}
                options={questions[questionIndex].options}
                onOptionClick={handleOptionClick}
              />
            )}
          </>
        ) : (
          <p>Please select a quiz from the drawer.</p>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
