const Quiz = require('../model/quiz-model');

exports.getQuizData = async (req, res) => {
  try {
    const category = req.params.category;
    const quizData = await Quiz.findOne({ category });

    if (!quizData) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quizData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};