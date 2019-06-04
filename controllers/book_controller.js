var Users = require('../models/user_model');
var Books = require('../models/books_model');
var CurrentUser = require('../controllers/user_controller');

var User = CurrentUser.CurrentUser // get current user for adding books

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.book_create = function (req, res) {
    // var books = new Books(
    //     {
    //         books: [{req.body.books}],
    //         price: req.body.price
    //     }
    // );
    Books.create(req.body).then(function(data){
        
        res.send(data+' Product Created successfully')

    });

    // product.save(function (err) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.send('Product Created successfully')
    // })
};

// Get list of books

exports.book_details = function (req, res) {
    Books.find({}, function (err, books) {
        if (err) return next(err);
        res.send(books);
    })
};
