var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var book_controller = require('../controllers/BookController');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', book_controller.test);


router.post('/create', book_controller.book_create);

router.get('/books_list', book_controller.book_details);



module.exports = router;