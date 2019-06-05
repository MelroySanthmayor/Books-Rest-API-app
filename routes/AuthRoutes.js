var express = require('express');
var router = express.Router();
var VerifyToken = require('../VerifyToken');

// Require the controllers WHICH WE DID NOT CREATE YET!!
var AuthController = require('../controllers/AuthController');


router.post('/register', AuthController.registerUser);

router.get('/me', VerifyToken, AuthController.currentUser);

router.post('/login', AuthController.loginUser);

router.get('/logout', AuthController.logoutUser);



module.exports = router;