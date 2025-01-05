// routes/quizzes.js
const express = require('express');
const router = express.Router();
const Quiz = require('../model/quiz-model'); // Make sure this path is correct

router.get('/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const quiz = await Quiz.findOne({ category });
    if (quiz) {
      res.json(quiz); 
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
