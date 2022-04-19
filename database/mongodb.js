const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://githubfetch:hackreactor@cluster0.ndqjv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true });

const reviewSchema = mongoose.Schema({
  username: String,
  email: String,
  summary: String,
  body: String,
  reported: Boolean,
  helpfulness: Number,
});

// const Review = mongoose.model('Review', reviewSchema);

const db = reviewSchema.connection;

module.exports = db;
