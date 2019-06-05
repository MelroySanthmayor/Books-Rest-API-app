var mongoose = require('mongoose');
var BooksSchema = new mongoose.Schema({
    title : String,
    author : String
});
mongoose.model('Book', BooksSchema);

//module.exports = mongoose.model('Book');

module.exports = BooksSchema;