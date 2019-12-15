const mongoose = require('mongoose');

const Comments = mongoose.Schema({
  date: Date,
  author: String,
  email: String,
  text: String,
  type: Number,
  display: Boolean,
  blogPostId: Number
})

const Comment = mongoose.model('Comment', Comments);

module.exports = Comment;
