var Users = require('../models/UserModel');
var Books = require('../models/BooksModel');
var CurrentUser = require('./UserController');
var MongoClient = require('mongodb').MongoClient; // for writing queries to the db
var url = 'mongodb://localhost/books';
const JSON = require('circular-json');
var ObjectId = require('mongodb').ObjectID;  // to query using user id while using mongoclient, works

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
            res.status(200).send(user.books);
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
            user_name : User.name,
            user_books : User.books
        }
        res.status(200).send(data);
    });
};

exports.book_filter = function (req, res, next) {
    Users.findById(req.userId, function (err, user) {
        if (err) {
            return next(err);
        }
        const User = user;
        const FilteredUser = User.books.filter(data => data.title.includes(req.query.text));
        var data = {
            user_books : FilteredUser
        }
        res.status(200).send(data);
    });

};


    // Below code was trial for text search with $text and indexing, lot of R & D on that, moving on to //a simpler approach, below appraoch works for the where condition



    // MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    //     var db = client.db('books');
    //     // if(db.collection('users').getIndexes().length > 0){
    //     //     db.collection('users'.dropIndex())
    //     // }
    //     //db.collection('users').dropIndex("title_text_author_text");
    //     //db.collection('users').createIndex( { title : "text" });
    //     // query : $where: function() { return this._id === ObjectId(req.userId) },
    //     //$text: {$search: req.query.text}}
    //     db.collection('users').find({$where: function() { return this._id === ObjectId(req.userId) }}).toArray(function(err, result) {  
    //         if (err) throw err;  
    //         console.log(req.userId, req.query.text);
    //         res.send(result);
    //     //noinspection JSDeprecatedSymbols
    //     // cursor.each(function(err, item) {
        
    //     //     if (item != null) {
                
    //     //     }
    //     // });
        
    //         client.close();
    //     });
        // var json = JSON.stringify(cursor)
        // res.send(json);
        // client.close();
   //});

// result returns a list of books as follows for the function books_details
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