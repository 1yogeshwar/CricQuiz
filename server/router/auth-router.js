// router/auth-router.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/auth-controller');
const { validateRegistration,validateLogin  } = require('../middleware/validateRegistration');

const home = (req, res) => {
  res.send('Welcome to the home page');
};

router.route('/').get(home);

router.route('/auth/register').post(validateRegistration, registerUser);
router.route('/auth/login').post(validateLogin, loginUser);

module.exports = router;
