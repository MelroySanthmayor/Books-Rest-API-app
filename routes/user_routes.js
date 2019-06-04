var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var user_controller = require('../controllers/user_controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user_controller.test);


router.post('/', user_controller.user_create);

router.get('/:id', user_controller.get_single_user);

router.put('/:id', user_controller.update_user);

router.delete('/:id', user_controller.delete_user);


module.exports = router;