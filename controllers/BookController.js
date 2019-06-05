var Users = require('../models/UserModel');
var Books = require('../models/BooksModel');
var CurrentUser = require('./UserController');

var User = CurrentUser.CurrentUser // get current user for adding books
// books: {title: req.body.title, author: req.body.author}
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.book_create = function (req, res, next) {
    Users.findById(req.userId, 
    function (err, user) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        const User = user;
        User.books.push({title: req.body.title, author: req.body.author});
        User.save();
        res.status(200).send(user);
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
