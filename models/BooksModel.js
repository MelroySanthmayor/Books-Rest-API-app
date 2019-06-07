var mongoose = require('mongoose');
var BooksSchema = new mongoose.Schema({
    title : String,
    author : String
});
//BooksSchema.index({ title : 'text'});  // indexing for text search , this approach is deprecated
mongoose.model('Book', BooksSchema);

//module.exports = mongoose.model('Book');

module.exports = BooksSchema;