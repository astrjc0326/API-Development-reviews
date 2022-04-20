const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://githubfetch:hackreactor@cluster0.ndqjv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true });

const reviewSchema = mongoose.Schema({
  _id: { type: Number, unique: true },
  username: String,
  email: String,
  summary: String,
  body: String,
  reported: Boolean,
  helpfulness: Number,
  recommended: Boolean,
  photos: [String],
  rating: Number,
  characteristics: {
    name: String,
    char_id: Number,
    value: Number,
  },
});

const characteristicsSchema = mongoose.Schema({
  _id: { type: Number, unique: true },
  product_id: Number,
  characteristic: String,
});

const reviewDB = reviewSchema.connection;
const charDB = characteristicsSchema.connection;
module.exports = {
  reviewDB,
  charDB,
};
