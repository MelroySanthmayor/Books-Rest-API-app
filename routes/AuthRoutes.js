var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var AuthController = require('../controllers/AuthController');


router.post('/register', AuthController.registerUser);

router.get('/me', AuthController.currentUser);

router.post('/login', AuthController.loginUser);



module.exports = router;