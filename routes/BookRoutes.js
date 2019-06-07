var express = require('express');
var router = express.Router();
var VerifyToken = require('../VerifyToken');  // Using a custom middleware fucntion to protect routes for adding and getting list of books
// TODO : Learn the use of next() while using middleware to pass control to next waiting function in the stack
// Require the controllers WHICH WE DID NOT CREATE YET!!
var book_controller = require('../controllers/BookController');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', book_controller.test);


router.post('/create', VerifyToken, book_controller.book_create);

router.get('/list', VerifyToken, book_controller.books_details);

router.get('/filter', VerifyToken, book_controller.book_filter);



module.exports = router;