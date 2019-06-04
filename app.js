// app.js

var express = require('express');
var bodyParser = require('body-parser');

var books = require('./routes/books'); // Imports routes for the books
var users = require('./routes/user_routes'); // Import routes for the users
var app = express();


// Set up mongoose connection
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/books', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/user', users);
app.use('/books', books);


var port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
