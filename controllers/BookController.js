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
        User.save(function (err) {
            if (err){
                return next(err);

            }
            res.status(200).send(user);
        });
        
    });

    // product.save(function (err) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.send('Product Created successfully')
    // })
};

// Get list of books

exports.books_details = function (req, res, next) {
    Users.findById(req.userId, function (err, user) {
        if (err) {
            return next(err);
        }
        const User = user;
        var data = {
            user_books : User.books
        }
        res.status(200).send(data);
    });
};

// result returns a list of books as follows
// {
//     "user_books": [
//         {
//             "_id": "5cf7f0768843d87b0d5897b1",
//             "title": "Harry Potter and the Order of the Pheonix",
//             "author": "J.K Rowling"
//         },
//         {
//             "_id": "5cf806e72a72ee7d346a2c0d",
//             "title": "Harry Potter and the Prisoner of Azkaban",
//             "author": "J.K Rowling"
//         },
//         {
//             "_id": "5cf807162a72ee7d346a2c0e",
//             "title": "Harry Potter and the Goblet of Fire",
//             "author": "J.K Rowling"
//         },
//         {
//             "_id": "5cf80bd360f6177fed9056b4",
//             "title": "Harry Potter and the Deathly Hallows",
//             "author": "J.K Rowling"
//         },
//         {
//             "_id": "5cf811ae2b92c903e91fcd5c",
//             "title": "Harry Potter and the Sorcerer's Stone",
//             "author": "J.K Rowling"
//         }
//     ]
// }