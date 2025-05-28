const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authController');

router.post('/client/signup', signup);

module.exports = router; 