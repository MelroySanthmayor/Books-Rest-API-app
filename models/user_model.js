var mongoose = require('mongoose');  
var BookSchema = require('./books_model');
// embedding technique, exlpore reference technique for relational data
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  books: BookSchema
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');