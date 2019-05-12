const mongoose = require('mongoose');

const Comments = mongoose.Schema({
  date: Date,
  author: String,
  email: String,
  text: String,
  display: Boolean
})

const Comment = mongoose.model('Comment', Comments);

module.exports = Comment;
