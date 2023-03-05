const express = require('express');
const AuthController = require('../controllers/AuthController.js');
const router = express.Router();

const authController = new AuthController();

router.get('/login', authController.login.bind(authController));
router.get('/logout', authController.logout.bind(authController));

module.exports = router;