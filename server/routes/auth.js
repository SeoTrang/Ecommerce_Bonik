const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

router.post('/register',AuthController.register);
router.post('/login/admin',AuthController.adminLogin);
router.post('/login',AuthController.login);
router.post('/logout',AuthController.logout);

module.exports = router;