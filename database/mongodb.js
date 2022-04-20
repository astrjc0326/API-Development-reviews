const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://githubfetch:hackreactor@cluster0.ndqjv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true });

const metaSchema = mongoose.Schema({
  _id: { type: Number, unique: true },
  product_id: Number,
  ratings: {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number,
  },
  recommended: {
    false: Number,
    true: Number,
  },
  reviews: [Number],
});

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
});

const characteristicSchema = mongoose.Schema({
  _id: { type: Number, unique: true },
  product_id: Number,
  type: String,
  value: Number,
});

// const db = reviewSchema.connection;
// module.exports = db;
